<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { getConfigItem, CONFIG_KEY_SEO } from './stores/config'

const seoInfo = getConfigItem(CONFIG_KEY_SEO)
console.log(seoInfo)
// 初始化 SEO_TITLE 模板和主题
useHead({
	titleTemplate: (s) => {
		return s ? `${s} - ${seoInfo['title']}` : `${seoInfo['title']}`
	},
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: seoInfo['icon'],
		},
		{
			rel: 'canonical',
			href: 'https://www.smartwallex.com'
		},
		{
			rel: 'preload',
			href: '/smartwallex2.jpg',
			as: 'image'
		},
		{
			rel: 'dns-prefetch',
			href: '//img.fre123.com'
		}
	],
	meta: [
		{
			name: 'keywords',
			content: seoInfo['keywords'],
		},
		{
			name: 'description',
			content: seoInfo['description'],
		},
		{
			name: 'author',
			content: 'SmartWallex'
		},
		{
			name: 'robots',
			content: 'index, follow'
		},
		{
			'http-equiv': 'Content-Language',
			content: 'zh-CN'
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		},
		// Open Graph Meta Tags
		{
			property: 'og:title',
			content: seoInfo['title']
		},
		{
			property: 'og:description',
			content: seoInfo['description']
		},
		{
			property: 'og:image',
			content: 'https://www.smartwallex.com/smartwallex2.jpg'
		},
		{
			property: 'og:url',
			content: 'https://www.smartwallex.com'
		},
		{
			property: 'og:type',
			content: 'website'
		},
		{
			property: 'og:site_name',
			content: 'SmartWallex'
		},
		// Twitter Card Meta Tags
		{
			name: 'twitter:card',
			content: 'summary_large_image'
		},
		{
			name: 'twitter:title',
			content: seoInfo['title']
		},
		{
			name: 'twitter:description',
			content: seoInfo['description']
		},
		{
			name: 'twitter:image',
			content: 'https://www.smartwallex.com/smartwallex2.jpg'
		}
	],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				"name": "SmartWallex",
				"alternateName": "聪明钱一站式导航平台",
				"url": "https://www.smartwallex.com",
				"description": seoInfo['description'],
				"inLanguage": "zh-CN",
				"potentialAction": {
					"@type": "SearchAction",
					"target": {
						"@type": "EntryPoint",
						"urlTemplate": "https://www.smartwallex.com/search?q={search_term_string}"
					},
					"query-input": "required name=search_term_string"
				}
			})
		}
	],
	bodyAttrs: {
		class: 'bg-base',
	},
})
</script>
