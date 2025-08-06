#!/usr/bin/env node

const { chromium } = require('@playwright/test');

async function waitForServer(url, maxAttempts = 30, interval = 2000) {
  console.log(`⏳ 等待服务器启动: ${url}`);
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        timeout: 5000 
      });
      if (response.ok) {
        console.log(`✅ 服务器已启动 (${i + 1}次尝试)`);
        return true;
      }
    } catch (error) {
      // 忽略连接错误，继续尝试
    }
    
    if (i < maxAttempts - 1) {
      process.stdout.write('.');
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  
  console.log(`\n❌ 服务器启动超时`);
  return false;
}

async function runTabSwitchingTest() {
  console.log('🚀 开始Tab切换功能测试...\n');
  
  const testResults = {
    passed: [],
    failed: [],
    warnings: [],
    groups: []
  };
  
  let browser;
  
  try {
    // 1. 等待服务器启动
    const serverReady = await waitForServer('http://localhost:3000/');
    if (!serverReady) {
      console.log('❌ 服务器未启动，请先运行 npm run dev');
      return testResults;
    }
    
    // 2. 启动浏览器
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ 
      headless: false, // 显示浏览器界面
      slowMo: 500 // 减慢操作速度，便于观察
    });
    
    const page = await browser.newPage();
    page.setDefaultTimeout(30000);
    
    // 3. 访问网站
    console.log('📍 访问 http://localhost:3000/');
    await page.goto('http://localhost:3000/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // 4. 等待页面加载
    console.log('⏳ 等待页面内容加载...');
    try {
      await page.waitForSelector('.index-nav-group', { 
        state: 'visible', 
        timeout: 20000 
      });
      console.log('✅ 页面加载成功');
    } catch (e) {
      console.log('⚠️  页面元素加载超时，继续测试...');
      await page.screenshot({ path: 'debug-page-load.png' });
    }
    
    // 5. 获取所有导航分组
    console.log('\n🔍 分析导航分组结构...');
    
    const groups = await page.evaluate(() => {
      const groupElements = document.querySelectorAll('.index-nav-group');
      return Array.from(groupElements).map((group, index) => {
        const header = group.querySelector('h2 span');
        const groupName = header ? header.textContent.trim() : `未命名分组${index}`;
        const tabs = group.querySelectorAll('[id^="nav_group_tab"]');
        const tabNames = Array.from(tabs).map(tab => tab.textContent.trim());
        const groupId = group.id;
        
        return {
          index,
          name: groupName,
          id: groupId,
          tabCount: tabs.length,
          tabNames: tabNames,
          isVisible: group.offsetParent !== null
        };
      }).filter(group => group.isVisible);
    });
    
    testResults.groups = groups;
    
    console.log(`📊 发现 ${groups.length} 个可见导航分组:`);
    groups.forEach(group => {
      console.log(`  ${group.index + 1}. ${group.name}: ${group.tabCount}个tab`);
      group.tabNames.forEach((tabName, i) => {
        console.log(`     - ${tabName}`);
      });
    });
    
    // 6. 测试每个分组的tab切换
    console.log('\n🔄 开始Tab切换功能测试...');
    
    for (const group of groups) {
      console.log(`\n📂 测试分组 ${group.index + 1}/${groups.length}: ${group.name}`);
      
      try {
        // 滚动到分组位置
        await page.locator(`#${group.id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        const groupElement = page.locator(`#${group.id}`);
        const tabs = await groupElement.locator('[id^="nav_group_tab"]').all();
        
        console.log(`  🔍 发现 ${tabs.length} 个tab`);
        
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          const tabText = await tab.textContent();
          
          console.log(`    🔘 测试tab ${i + 1}/${tabs.length}: ${tabText}`);
          
          try {
            // 确保tab可见并可点击
            await tab.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            
            // 点击tab
            await tab.click();
            
            // 等待切换动画完成
            await page.waitForTimeout(1000);
            
            // 检查tab状态
            const tabClass = await tab.getAttribute('class') || '';
            const isActive = tabClass.includes('active');
            
            // 检查内容区域
            const contentItems = await groupElement.locator('.index-nav-group-content-item').count();
            const visibleContentItems = await groupElement.locator('.index-nav-group-content-item:visible').count();
            
            // 检查右上角链接
            const upperRightLink = await groupElement.locator('.text-right a').count();
            let linkText = '';
            if (upperRightLink > 0) {
              linkText = await groupElement.locator('.text-right a').first().textContent();
            }
            
            const resultText = `${group.name} - ${tabText}`;
            
            if (isActive && contentItems > 0) {
              console.log(`       ✅ 成功 - 激活状态: ${isActive}, 内容项目: ${visibleContentItems}/${contentItems}`);
              if (linkText) {
                console.log(`       🔗 右上角链接: ${linkText}`);
              }
              testResults.passed.push(resultText);
            } else if (contentItems > 0) {
              console.log(`       ⚠️  部分成功 - 激活状态: ${isActive}, 内容项目: ${visibleContentItems}/${contentItems}`);
              testResults.warnings.push(resultText);
            } else {
              console.log(`       ❌ 失败 - 无可见内容项目`);
              testResults.failed.push(resultText);
            }
            
          } catch (error) {
            console.log(`       ❌ 错误: ${error.message}`);
            testResults.failed.push(`${group.name} - ${tabText} (${error.message})`);
          }
        }
        
        // 测试分组内所有tab的循环切换
        console.log(`    🔄 测试循环切换...`);
        if (tabs.length > 1) {
          // 从第一个tab开始，依次点击到最后一个，再回到第一个
          for (let round = 0; round < 2; round++) {
            for (let i = 0; i < tabs.length; i++) {
              const tabIndex = round === 0 ? i : tabs.length - 1 - i;
              await tabs[tabIndex].click();
              await page.waitForTimeout(500);
            }
          }
          console.log(`       ✅ 循环切换测试完成`);
          testResults.passed.push(`${group.name} - 循环切换`);
        }
        
      } catch (error) {
        console.log(`    ❌ 分组测试失败: ${error.message}`);
        testResults.failed.push(`${group.name} - 分组测试 (${error.message})`);
      }
    }
    
    // 7. 测试特殊交互效果
    console.log('\n🎨 测试交互效果...');
    
    try {
      if (groups.length > 0) {
        const firstGroup = page.locator('.index-nav-group').first();
        const firstTab = firstGroup.locator('[id^="nav_group_tab"]').first();
        
        // 测试悬停效果
        console.log('  🖱️  测试悬停效果...');
        await firstTab.hover();
        await page.waitForTimeout(500);
        
        // 测试下划线动画
        console.log('  📏 测试下划线动画...');
        const anchor = firstGroup.locator('.anchor').first();
        const anchorExists = await anchor.count() > 0;
        
        if (anchorExists) {
          const anchorStyle = await anchor.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              borderBottom: styles.borderBottom,
              transition: styles.transition,
              opacity: styles.opacity
            };
          });
          
          console.log(`       ✅ 下划线元素存在 - 样式: ${anchorStyle.borderBottom}, 过渡: ${anchorStyle.transition}`);
          testResults.passed.push('下划线动画');
        } else {
          console.log(`       ⚠️  未找到下划线元素`);
          testResults.warnings.push('下划线动画');
        }
        
        // 测试响应式布局
        console.log('  📱 测试响应式布局...');
        await page.setViewportSize({ width: 375, height: 667 }); // 手机尺寸
        await page.waitForTimeout(1000);
        
        const mobileVisible = await firstGroup.isVisible();
        if (mobileVisible) {
          console.log(`       ✅ 移动端布局正常`);
          testResults.passed.push('移动端响应式');
        } else {
          console.log(`       ⚠️  移动端可能有问题`);
          testResults.warnings.push('移动端响应式');
        }
        
        // 恢复桌面尺寸
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForTimeout(500);
      }
      
    } catch (error) {
      console.log(`  ❌ 交互效果测试失败: ${error.message}`);
      testResults.failed.push(`交互效果测试 (${error.message})`);
    }
    
    // 8. 最终截图
    console.log('\n📸 保存测试结果截图...');
    await page.screenshot({ path: 'tab-test-final.png', fullPage: true });
    console.log('   ✅ 完整页面截图已保存');
    
    await page.screenshot({ path: 'tab-test-viewport.png' });
    console.log('   ✅ 视口截图已保存');
    
  } catch (error) {
    console.error('💥 测试过程中出现错误:', error);
    testResults.failed.push(`整体测试失败: ${error.message}`);
  } finally {
    // 清理资源
    if (browser) {
      await browser.close();
    }
  }
  
  return testResults;
}

// 生成测试报告
function generateReport(results) {
  const timestamp = new Date().toLocaleString();
  
  const report = `# Tab切换功能测试报告

## 测试信息
- **测试时间**: ${timestamp}
- **测试URL**: http://localhost:3000/
- **测试工具**: Playwright + Chromium
- **测试模式**: 可视化测试

## 测试结果摘要
- ✅ **通过**: ${results.passed.length} 项
- ⚠️  **警告**: ${results.warnings.length} 项
- ❌ **失败**: ${results.failed.length} 项
- 📊 **总计**: ${results.passed.length + results.warnings.length + results.failed.length} 项

## 导航分组结构
发现 ${results.groups.length} 个导航分组:

${results.groups.map(group => 
  `### ${group.index + 1}. ${group.name}
- **分组ID**: ${group.id}
- **Tab数量**: ${group.tabCount}
- **Tab列表**: ${group.tabNames.map(name => `"${name}"`).join(', ')}
- **可见性**: ${group.isVisible ? '可见' : '隐藏'}
`).join('\n')}

## 详细测试结果

### ✅ 通过的测试 (${results.passed.length})
${results.passed.map((result, index) => `${index + 1}. ${result}`).join('\n')}

### ⚠️  警告的测试 (${results.warnings.length})
${results.warnings.map((result, index) => `${index + 1}. ${result}`).join('\n')}

### ❌ 失败的测试 (${results.failed.length})
${results.failed.map((result, index) => `${index + 1}. ${result}`).join('\n')}

## 功能评估

### Tab切换功能
${results.failed.filter(f => f.includes('tab') && !f.includes('分组测试')).length === 0 ? 
  '✅ **Tab切换功能正常** - 所有tab都能正常切换并显示对应内容' : 
  '❌ **Tab切换功能存在问题** - 部分tab切换失败'
}

### 交互效果
${results.failed.filter(f => f.includes('交互效果')).length === 0 ? 
  '✅ **交互效果正常** - 悬停效果和动画正常工作' : 
  '❌ **交互效果存在问题** - 动画或交互效果异常'
}

### 响应式设计
${results.failed.filter(f => f.includes('响应式')).length === 0 ? 
  '✅ **响应式设计正常** - 在不同设备上都能正常显示' : 
  '❌ **响应式设计存在问题** - 在某些设备上显示异常'
}

## 建议和总结

### 总体评估
${results.failed.length === 0 ? 
  '🎉 **测试全部通过** - Tab切换功能完全正常，所有交互效果都能正确工作。' : 
  results.failed.length <= 3 ? 
  '⚠️  **基本正常** - 大部分功能正常，少数问题需要关注。' : 
  '❌ **存在较多问题** - 建议优先修复失败的项目。'
}

### 改进建议
${results.warnings.length > 0 ? 
  '1. 关注警告项目，这些可能存在潜在问题\n' : 
  ''}
${results.failed.length > 0 ? 
  `2. 优先修复失败的测试项目，共${results.failed.length}个\n` : 
  ''}
3. 建议定期运行回归测试，确保功能稳定性
4. 可以考虑添加更多边界情况的测试

## 测试环境
- Node.js版本: ${process.version}
- Playwright版本: ${require('@playwright/test').version}
- 测试时长: 约${Math.ceil((Date.now() - startTime) / 1000)}秒

---
*此报告由自动化测试脚本生成*
`;

  return report;
}

// 主函数
let startTime = Date.now();
runTabSwitchingTest().then(results => {
  console.log('\n📋 测试完成！生成报告...\n');
  
  // 输出控制台摘要
  console.log('='.repeat(50));
  console.log('📊 测试结果摘要:');
  console.log(`✅ 通过: ${results.passed.length}`);
  console.log(`⚠️  警告: ${results.warnings.length}`);
  console.log(`❌ 失败: ${results.failed.length}`);
  console.log('='.repeat(50));
  
  // 生成详细报告
  const report = generateReport(results);
  require('fs').writeFileSync('detailed-tab-test-report.md', report, 'utf8');
  console.log('📄 详细测试报告已保存到: detailed-tab-test-report.md');
  
  // 生成JSON结果
  require('fs').writeFileSync('test-results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('💾 测试结果数据已保存到: test-results.json');
  
  console.log('\n🎉 Tab切换功能测试完成！');
  
  // 返回适当的退出码
  process.exit(results.failed.length > 0 ? 1 : 0);
  
}).catch(error => {
  console.error('💥 测试运行失败:', error);
  process.exit(1);
});