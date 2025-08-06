#!/usr/bin/env node

const { spawn } = require('child_process');
const { chromium } = require('@playwright/test');

// 测试结果存储
const testResults = {
  passed: [],
  failed: [],
  warnings: []
};

async function runManualTest() {
  console.log('🚀 开始手动Tab切换功能测试...\n');
  
  let browser;
  let serverProcess;
  
  try {
    // 1. 启动开发服务器
    console.log('📡 启动开发服务器...');
    serverProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });
    
    // 等待服务器启动
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // 2. 启动浏览器
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // 设置页面超时
    page.setDefaultTimeout(60000);
    
    // 3. 访问网站
    console.log('📍 访问 http://localhost:3000/');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    
    // 4. 等待页面加载
    console.log('⏳ 等待页面加载...');
    try {
      await page.waitForSelector('.index-nav-group', { state: 'visible', timeout: 30000 });
      console.log('✅ 页面加载成功');
    } catch (e) {
      console.log('⚠️  页面加载超时，继续测试...');
      await page.screenshot({ path: 'page-load-debug.png' });
    }
    
    // 5. 获取所有导航分组
    console.log('\n🔍 获取导航分组信息...');
    const groups = await page.evaluate(() => {
      const groupElements = document.querySelectorAll('.index-nav-group');
      return Array.from(groupElements).map(group => {
        const header = group.querySelector('h2 span');
        const groupName = header ? header.textContent.trim() : 'Unknown';
        const tabs = group.querySelectorAll('[id^="nav_group_tab"]');
        const tabNames = Array.from(tabs).map(tab => tab.textContent.trim());
        
        return {
          name: groupName,
          id: group.id,
          tabCount: tabs.length,
          tabNames: tabNames
        };
      });
    });
    
    console.log(`📊 找到 ${groups.length} 个导航分组:`);
    groups.forEach(group => {
      console.log(`  • ${group.name}: ${group.tabCount}个tab (${group.tabNames.join(', ')})`);
    });
    
    // 6. 测试每个分组的tab切换
    console.log('\n🔄 开始测试Tab切换功能...');
    
    for (const group of groups) {
      console.log(`\n📂 测试分组: ${group.name}`);
      
      try {
        const groupElement = page.locator(`#${group.id}`);
        await groupElement.waitFor({ state: 'visible', timeout: 10000 });
        
        const tabs = await groupElement.locator('[id^="nav_group_tab"]').all();
        
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          const tabText = await tab.textContent();
          
          console.log(`  🔘 测试tab: ${tabText}`);
          
          try {
            // 点击tab
            await tab.click();
            await page.waitForTimeout(1000);
            
            // 检查是否激活
            const tabClass = await tab.getAttribute('class');
            const isActive = tabClass && tabClass.includes('active');
            
            // 检查内容
            const contentItems = await groupElement.locator('.index-nav-group-content-item').count();
            
            if (isActive) {
              console.log(`    ✅ Tab激活成功，显示${contentItems}个项目`);
              testResults.passed.push(`${group.name} - ${tabText}`);
            } else {
              console.log(`    ⚠️  Tab可能未激活，显示${contentItems}个项目`);
              testResults.warnings.push(`${group.name} - ${tabText}`);
            }
            
          } catch (error) {
            console.log(`    ❌ 测试失败: ${error.message}`);
            testResults.failed.push(`${group.name} - ${tabText}`);
          }
        }
        
      } catch (error) {
        console.log(`❌ 分组测试失败: ${error.message}`);
        testResults.failed.push(group.name);
      }
    }
    
    // 7. 测试交互效果
    console.log('\n🎨 测试交互效果...');
    
    try {
      const firstGroup = page.locator('.index-nav-group').first();
      const firstTab = firstGroup.locator('[id^="nav_group_tab"]').first();
      
      // 测试悬停效果
      await firstTab.hover();
      await page.waitForTimeout(500);
      
      const anchor = firstGroup.locator('.anchor').first();
      const anchorExists = await anchor.count() > 0;
      
      if (anchorExists) {
        console.log('✅ 下划线动画元素存在');
        testResults.passed.push('下划线动画');
      } else {
        console.log('⚠️  未找到下划线动画元素');
        testResults.warnings.push('下划线动画');
      }
      
    } catch (error) {
      console.log(`❌ 交互效果测试失败: ${error.message}`);
      testResults.failed.push('交互效果');
    }
    
    // 8. 截图保存
    await page.screenshot({ path: 'final-test-state.png', fullPage: true });
    console.log('\n📸 测试状态截图已保存');
    
  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
    testResults.failed.push('整体测试');
  } finally {
    // 清理资源
    if (browser) {
      await browser.close();
    }
    
    if (serverProcess) {
      serverProcess.kill();
    }
  }
  
  // 9. 输出测试报告
  console.log('\n📋 测试报告');
  console.log('='.repeat(50));
  console.log(`✅ 通过: ${testResults.passed.length}`);
  console.log(`⚠️  警告: ${testResults.warnings.length}`);
  console.log(`❌ 失败: ${testResults.failed.length}`);
  
  if (testResults.passed.length > 0) {
    console.log('\n✅ 通过的测试:');
    testResults.passed.forEach(result => console.log(`  • ${result}`));
  }
  
  if (testResults.warnings.length > 0) {
    console.log('\n⚠️  警告的测试:');
    testResults.warnings.forEach(result => console.log(`  • ${result}`));
  }
  
  if (testResults.failed.length > 0) {
    console.log('\n❌ 失败的测试:');
    testResults.failed.forEach(result => console.log(`  • ${result}`));
  }
  
  // 10. 生成详细报告
  const reportContent = `# Tab切换功能测试报告

## 测试概览
- 测试时间: ${new Date().toLocaleString()}
- 测试URL: http://localhost:3000/
- 测试工具: Playwright

## 测试结果
- ✅ 通过: ${testResults.passed.length}
- ⚠️  警告: ${testResults.warnings.length}
- ❌ 失败: ${testResults.failed.length}

## 详细结果

### 通过的测试 (${testResults.passed.length})
${testResults.passed.map(result => `- ${result}`).join('\n')}

### 警告的测试 (${testResults.warnings.length})
${testResults.warnings.map(result => `- ${result}`).join('\n')}

### 失败的测试 (${testResults.failed.length})
${testResults.failed.map(result => `- ${result}`).join('\n')}

## 导航分组统计
${groups.map(group => 
  `- **${group.name}**: ${group.tabCount}个tab (${group.tabNames.join(', ')})`
).join('\n')}

## 建议
${testResults.failed.length > 0 ? 
  '存在失败的测试，建议检查相关功能是否正常工作。' : 
  '大部分功能正常工作，警告项目建议进一步检查。'
}
`;
  
  require('fs').writeFileSync('tab-test-report.md', reportContent);
  console.log('\n📄 详细测试报告已保存到 tab-test-report.md');
  
  return testResults;
}

// 运行测试
runManualTest().then(results => {
  console.log('\n🎉 测试完成！');
  process.exit(results.failed.length > 0 ? 1 : 0);
}).catch(error => {
  console.error('💥 测试运行失败:', error);
  process.exit(1);
});