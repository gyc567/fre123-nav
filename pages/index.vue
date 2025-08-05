<template>
	<main ref="container">
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
		<nav id="nav-container" aria-label="加密货币工具导航" role="navigation">
			<IndexNavGroup v-for="(nav, i) in navList" :key="nav.group_name" :idx="i" :groupData="nav"></IndexNavGroup>
		</nav>
	</main>
</template>
<script setup lang="ts">
import navList from '../config/nav.json'
import { getConfigItem, CONFIG_KEY_SEO } from '../stores/config'

const seoInfo = getConfigItem(CONFIG_KEY_SEO)
const seoTitle = computed(() => seoInfo['title'])
const seoDescription = computed(() => seoInfo['description'])
</script>
<style></style>
