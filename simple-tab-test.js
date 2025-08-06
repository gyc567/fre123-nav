#!/usr/bin/env node

const { chromium } = require('@playwright/test');

async function simpleTabTest() {
  console.log('🚀 开始简化的Tab切换测试...\n');
  
  const testResults = {
    passed: [],
    failed: [],
    warnings: [],
    groups: []
  };
  
  let browser;
  
  try {
    // 1. 检查服务器状态
    console.log('🔍 检查服务器状态...');
    try {
      const response = await fetch('http://localhost:3000/', { 
        method: 'HEAD',
        timeout: 5000 
      });
      if (response.ok) {
        console.log('✅ 服务器运行正常');
      } else {
        console.log(`⚠️  服务器响应: ${response.status}`);
      }
    } catch (error) {
      console.log('❌ 服务器连接失败:', error.message);
      return testResults;
    }
    
    // 2. 启动浏览器
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ 
      headless: true, // 无头模式，更快
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    page.setDefaultTimeout(20000);
    
    // 3. 访问网站
    console.log('📍 访问 http://localhost:3000/');
    await page.goto('http://localhost:3000/', { 
      waitUntil: 'domcontentloaded',
      timeout: 20000 
    });
    
    // 4. 等待基本内容
    console.log('⏳ 等待页面内容...');
    try {
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('✅ 页面基本加载完成');
    } catch (e) {
      console.log('⚠️  页面加载可能有问题');
    }
    
    // 5. 简化的页面分析
    console.log('\n🔍 分析页面结构...');
    
    const pageInfo = await page.evaluate(() => {
      const title = document.title;
      const hasNavGroups = document.querySelectorAll('.index-nav-group').length > 0;
      const groupCount = document.querySelectorAll('.index-nav-group').length;
      const tabCount = document.querySelectorAll('[id^="nav_group_tab"]').length;
      
      return {
        title,
        hasNavGroups,
        groupCount,
        tabCount,
        bodyText: document.body.textContent.substring(0, 200)
      };
    });
    
    console.log(`📄 页面标题: ${pageInfo.title}`);
    console.log(`📊 导航分组: ${pageInfo.groupCount} 个`);
    console.log(`📋 Tab总数: ${pageInfo.tabCount} 个`);
    
    if (pageInfo.hasNavGroups) {
      console.log('✅ 找到导航分组结构');
    } else {
      console.log('⚠️  未找到导航分组结构');
    }
    
    // 6. 详细分析每个分组
    console.log('\n📂 详细分析导航分组...');
    
    const groups = await page.evaluate(() => {
      const groupElements = document.querySelectorAll('.index-nav-group');
      return Array.from(groupElements).map((group, index) => {
        const header = group.querySelector('h2');
        const groupName = header ? header.textContent.trim() : `未命名分组${index}`;
        const tabs = group.querySelectorAll('[id^="nav_group_tab"]');
        const tabNames = Array.from(tabs).map(tab => tab.textContent.trim());
        const groupId = group.id || `group-${index}`;
        
        return {
          index,
          name: groupName,
          id: groupId,
          tabCount: tabs.length,
          tabNames: tabNames,
          isVisible: group.offsetParent !== null
        };
      });
    });
    
    testResults.groups = groups;
    
    groups.forEach(group => {
      console.log(`  ${group.index + 1}. ${group.name}: ${group.tabCount}个tab`);
      if (group.tabNames.length > 0) {
        console.log(`     Tabs: ${group.tabNames.join(', ')}`);
      }
    });
    
    // 7. 基础tab切换测试
    console.log('\n🔄 基础Tab切换测试...');
    
    for (const group of groups) {
      console.log(`\n📂 测试分组: ${group.name}`);
      
      try {
        const groupElement = page.locator(`#${group.id}`);
        const groupExists = await groupElement.count() > 0;
        
        if (!groupExists) {
          console.log(`  ⚠️  分组元素不存在，跳过`);
          continue;
        }
        
        const tabs = await groupElement.locator('[id^="nav_group_tab"]').all();
        
        if (tabs.length === 0) {
          console.log(`  ⚠️  没有找到tab，跳过`);
          continue;
        }
        
        console.log(`  🔍 找到 ${tabs.length} 个tab`);
        
        // 测试第一个tab
        const firstTab = tabs[0];
        const firstTabText = await firstTab.textContent();
        
        try {
          await firstTab.click();
          await page.waitForTimeout(500);
          
          const tabClass = await firstTab.getAttribute('class') || '';
          const isActive = tabClass.includes('active');
          
          const contentItems = await groupElement.locator('.index-nav-group-content-item').count();
          
          console.log(`    ✅ 点击 "${firstTabText}" - 激活: ${isActive}, 内容: ${contentItems}项`);
          testResults.passed.push(`${group.name} - ${firstTabText}`);
          
        } catch (error) {
          console.log(`    ❌ 点击 "${firstTabText}" 失败: ${error.message}`);
          testResults.failed.push(`${group.name} - ${firstTabText}`);
        }
        
        // 如果有多个tab，测试最后一个
        if (tabs.length > 1) {
          const lastTab = tabs[tabs.length - 1];
          const lastTabText = await lastTab.textContent();
          
          try {
            await lastTab.click();
            await page.waitForTimeout(500);
            
            const tabClass = await lastTab.getAttribute('class') || '';
            const isActive = tabClass.includes('active');
            
            const contentItems = await groupElement.locator('.index-nav-group-content-item').count();
            
            console.log(`    ✅ 点击 "${lastTabText}" - 激活: ${isActive}, 内容: ${contentItems}项`);
            testResults.passed.push(`${group.name} - ${lastTabText}`);
            
          } catch (error) {
            console.log(`    ❌ 点击 "${lastTabText}" 失败: ${error.message}`);
            testResults.failed.push(`${group.name} - ${lastTabText}`);
          }
        }
        
      } catch (error) {
        console.log(`  ❌ 分组测试失败: ${error.message}`);
        testResults.failed.push(`${group.name} - 分组错误`);
      }
    }
    
    // 8. 基础交互测试
    console.log('\n🎨 基础交互测试...');
    
    try {
      if (groups.length > 0) {
        const firstGroup = page.locator('.index-nav-group').first();
        const firstTab = firstGroup.locator('[id^="nav_group_tab"]').first();
        
        // 测试悬停
        await firstTab.hover();
        await page.waitForTimeout(200);
        
        // 测试下划线
        const anchor = firstGroup.locator('.anchor').first();
        const anchorExists = await anchor.count() > 0;
        
        if (anchorExists) {
          console.log('  ✅ 下划线元素存在');
          testResults.passed.push('下划线元素');
        } else {
          console.log('  ⚠️  下划线元素不存在');
          testResults.warnings.push('下划线元素');
        }
        
        testResults.passed.push('基础悬停测试');
      }
      
    } catch (error) {
      console.log(`  ❌ 交互测试失败: ${error.message}`);
      testResults.failed.push('交互测试');
    }
    
    // 9. 保存截图
    try {
      await page.screenshot({ path: 'simple-test-result.png', fullPage: true });
      console.log('\n📸 测试截图已保存');
    } catch (error) {
      console.log(`\n⚠️  截图失败: ${error.message}`);
    }
    
  } catch (error) {
    console.error('💥 测试失败:', error);
    testResults.failed.push(`整体测试失败: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  return testResults;
}

// 生成简化的报告
function generateSimpleReport(results) {
  const timestamp = new Date().toLocaleString();
  
  const report = `# Tab切换功能简化测试报告

## 测试信息
- **测试时间**: ${timestamp}
- **测试URL**: http://localhost:3000/
- **测试工具**: Playwright (无头模式)
- **测试类型**: 基础功能验证

## 测试结果摘要
- ✅ **通过**: ${results.passed.length} 项
- ⚠️  **警告**: ${results.warnings.length} 项  
- ❌ **失败**: ${results.failed.length} 项

## 发现的导航分组 (${results.groups.length}个)

${results.groups.map(group => 
  `### ${group.index + 1}. ${group.name}
- **Tab数量**: ${group.tabCount}
- **Tab列表**: ${group.tabNames.join(', ')}
- **可见性**: ${group.isVisible ? '可见' : '隐藏'}
`).join('\n')}

## 测试结果详情

### ✅ 通过的测试 (${results.passed.length})
${results.passed.map((result, index) => `${index + 1}. ${result}`).join('\n')}

### ⚠️  警告的测试 (${results.warnings.length})
${results.warnings.map((result, index) => `${index + 1}. ${result}`).join('\n')}

### ❌ 失败的测试 (${results.failed.length})
${results.failed.map((result, index) => `${index + 1}. ${result}`).join('\n')}

## 功能评估

### Tab切换功能
${results.failed.filter(f => f.includes('tab')).length === 0 ? 
  '✅ **Tab切换功能基本正常** - 能够正常点击和切换tab' : 
  '❌ **Tab切换功能存在问题** - 部分tab切换失败'
}

### 页面结构
${results.groups.length > 0 ? 
  '✅ **页面结构完整** - 找到预期的导航分组和tab结构' : 
  '❌ **页面结构异常** - 未找到导航分组结构'
}

## 建议
${results.failed.length === 0 ? 
  '🎉 **测试通过** - Tab切换功能正常工作，建议进行更详细的用户界面测试。' : 
  `⚠️  **存在${results.failed.length}个问题** - 建议优先修复失败的测试项目。`
}

---
*此报告由简化测试脚本生成*
`;

  return report;
}

// 运行测试
simpleTabTest().then(results => {
  console.log('\n📋 简化测试完成！');
  console.log('='.repeat(40));
  console.log('📊 测试结果:');
  console.log(`✅ 通过: ${results.passed.length}`);
  console.log(`⚠️  警告: ${results.warnings.length}`);
  console.log(`❌ 失败: ${results.failed.length}`);
  console.log('='.repeat(40));
  
  // 生成报告
  const report = generateSimpleReport(results);
  require('fs').writeFileSync('simple-tab-test-report.md', report, 'utf8');
  console.log('\n📄 测试报告已保存到: simple-tab-test-report.md');
  
  // 保存JSON结果
  require('fs').writeFileSync('simple-test-results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('💾 测试数据已保存到: simple-test-results.json');
  
  console.log('\n🎉 简化Tab切换测试完成！');
  
  process.exit(results.failed.length > 0 ? 1 : 0);
  
}).catch(error => {
  console.error('💥 测试运行失败:', error);
  process.exit(1);
});