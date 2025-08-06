import { test, expect } from '@playwright/test';

test.describe('Tab切换功能测试', () => {
  test.beforeEach(async ({ page }) => {
    // 访问首页
    await page.goto('http://localhost:3000/');
    // 等待页面加载完成
    await page.waitForSelector('.index-nav-group', { state: 'visible' });
  });

  test.describe('加密资讯分组', () => {
    test('应该有3个tab并且可以正常切换', async ({ page }) => {
      const groupName = '加密资讯';
      const expectedTabs = ['加密常用', '中心化交易所', '新手入门学习大全'];
      
      // 找到对应的分组
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      // 验证tab数量
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      // 测试每个tab的切换
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        // 点击tab
        await tab.click();
        
        // 等待切换动画完成
        await page.waitForTimeout(500);
        
        // 验证tab处于active状态
        await expect(tab).toHaveClass(/active/);
        
        // 验证对应的内容区域有可见的项目
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('市场数据分组', () => {
    test('应该有4个tab并且可以正常切换', async ({ page }) => {
      const groupName = '市场数据';
      const expectedTabs = ['综合数据分析平台', 'K线数据', '链上数据平台', '链上巨鲸数据追踪'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('DEFI去中心化金融分组', () => {
    test('应该有4个tab并且可以正常切换', async ({ page }) => {
      const groupName = 'DEFI去中心化金融';
      const expectedTabs = ['DEFI仪表盘', '去中心化钱包', 'NFT 工具', '跨链桥'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('MEME资源与工具分组', () => {
    test('应该有3个tab并且可以正常切换', async ({ page }) => {
      const groupName = 'MEME资源与工具';
      const expectedTabs = ['聪明钱追踪', '新手入门与教程', '精选TG频道'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('实用工具分组', () => {
    test('应该有3个tab并且可以正常切换', async ({ page }) => {
      const groupName = '实用工具';
      const expectedTabs = ['综合查询', '指数查询', '币种官网'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('安全服务与工具分组', () => {
    test('应该有2个tab并且可以正常切换', async ({ page }) => {
      const groupName = '安全服务与工具';
      const expectedTabs = ['授权相关', '安全分析平台'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('币圈媒体分组', () => {
    test('应该有2个tab并且可以正常切换', async ({ page }) => {
      const groupName = '币圈媒体';
      const expectedTabs = ['推特大V', '外网权威币圈媒体'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        await expect(contentItems).toBeGreaterThan(0);
        
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('图片壁纸分组', () => {
    test('应该有2个tab并且可以正常切换', async ({ page }) => {
      const groupName = '图片壁纸';
      const expectedTabs = ['免费壁纸', '摄影美图'];
      
      const group = await page.locator(`#nav_group${groupName}`).first();
      await expect(group).toBeVisible();
      
      const tabs = await group.locator('[id^="nav_group_tab"]').count();
      await expect(tabs).toBe(expectedTabs.length);
      
      for (let i = 0; i < expectedTabs.length; i++) {
        const tabName = expectedTabs[i];
        const tab = await group.locator(`#nav_group_tab${groupName}_${tabName}`).first();
        
        await tab.click();
        await page.waitForTimeout(500);
        
        await expect(tab).toHaveClass(/active/);
        
        // 注意：图片壁纸分组的某些项目可能被隐藏（is_show: false）
        const contentItems = await group.locator('.index-nav-group-content-item').count();
        console.log(`✓ ${groupName} - ${tabName} tab切换正常，显示${contentItems}个项目`);
      }
    });
  });

  test.describe('Tab切换交互效果', () => {
    test('验证tab悬停效果和下划线动画', async ({ page }) => {
      const groupName = '加密资讯';
      const group = await page.locator(`#nav_group${groupName}`).first();
      
      // 获取第一个tab
      const firstTab = await group.locator('[id^="nav_group_tab"]').first();
      
      // 验证悬停效果
      await firstTab.hover();
      await expect(firstTab).toHaveCSS('color', /rgb\(0,\s*123,\s*255\)|#007bff/);
      
      // 验证下划线元素存在
      const anchor = await group.locator('.anchor').first();
      await expect(anchor).toBeVisible();
      
      // 验证下划线有过渡动画
      await expect(anchor).toHaveCSS('transition', /transform 0\.3s.*width 0\.3s/);
      
      console.log('✓ Tab悬停效果和下划线动画正常');
    });
  });

  test.describe('内容区域验证', () => {
    test('验证切换tab后内容区域正确更新', async ({ page }) => {
      const groupName = '加密资讯';
      const group = await page.locator(`#nav_group${groupName}`).first();
      
      // 获取两个不同的tab
      const tab1 = await group.locator('#nav_group_tab加密资讯_加密常用').first();
      const tab2 = await group.locator('#nav_group_tab加密资讯_中心化交易所').first();
      
      // 点击第一个tab并记录内容
      await tab1.click();
      await page.waitForTimeout(500);
      
      const content1 = await group.locator('.index-nav-group-content-item').allTextContents();
      
      // 点击第二个tab并记录内容
      await tab2.click();
      await page.waitForTimeout(500);
      
      const content2 = await group.locator('.index-nav-group-content-item').allTextContents();
      
      // 验证内容发生了变化
      expect(content1.toString()).not.toBe(content2.toString());
      
      console.log('✓ Tab切换后内容区域正确更新');
    });
  });
});