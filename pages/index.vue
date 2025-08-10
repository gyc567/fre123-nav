<template>
	<main ref="container">
		<!-- 头部广告 -->
		<HeaderBannerAd />
		
		<!-- 首页主要内容区 -->
		<section class="hero-section" style="text-align: center; padding: 20px 0;">
			<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #333;">
				{{ seoTitle }}
			</h1>
			<p style="font-size: 1.1rem; color: #666; max-width: 800px; margin: 0 auto;">
				{{ seoDescription }}
			</p>
		</section>
		
		<!-- 导航工具集合 -->
		<nav id="nav-container" aria-label="加密货币工具导航" role="navigation" class="nav-container">
			<template v-if="navList && navList.length > 0">
				<IndexNavGroup 
					v-for="(nav, i) in navList" 
					:key="`${nav.group_name}-${i}`" 
					:idx="i" 
					:groupData="nav"
				/>
			</template>
			<div v-else class="no-nav-data">
				<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-yellow-800">
								暂无导航数据
							</h3>
							<div class="mt-2 text-sm text-yellow-700">
								<p>请检查导航配置文件是否正确加载。</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		
		<!-- 底部广告 -->
		<FooterBannerAd />
	</main>
</template>
<script setup lang="ts">
import navList from '../config/nav.json'
import { getConfigItem, CONFIG_KEY_SEO } from '../stores/config'
import HeaderBannerAd from '../components/Ads/HeaderBannerAd.vue'
import FooterBannerAd from '../components/Ads/FooterBannerAd.vue'

const seoInfo = getConfigItem(CONFIG_KEY_SEO)
const seoTitle = computed(() => seoInfo['title'])
const seoDescription = computed(() => seoInfo['description'])

// 调试信息
onMounted(() => {
	console.log('Index page mounted')
	console.log('NavList:', navList)
	console.log('NavList length:', navList?.length)
	console.log('First nav item:', navList?.[0])
})
</script>
<style scoped>
.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
}

.hero-section {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 1rem;
}

.no-nav-data {
	margin: 2rem 0;
}

@media (max-width: 768px) {
	.nav-container {
		padding: 0 0.5rem;
	}
	
	.hero-section {
		padding: 1rem 0.5rem;
	}
}
</style>
