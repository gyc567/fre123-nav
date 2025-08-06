<template>
	<section
		v-if="currentTabHasVisibleItems"
		:id="`${classNamePrefixGroup}${groupData.group_name}`"
		class="index-nav-group bg-white pt-[10px] mb-[20px] px-4 rounded-lg"
		:aria-label="`${groupData.group_name}工具分类`"
	>
		<header class="flex flex-row pl-[5px] pt-[8px] leading-[28px] overflow-x-scroll no-scrollbar">
			<h2 class="text-gray-500 text-md md:text-lg flex">
				<span class="text-[16px] md:text-[18px] text-[#555555] pr-2 font-semibold truncate">{{
					groupData.group_name
				}}</span>
			</h2>
			<div class="h-[18px] my-[5px] w-[2px] bg-gray-200 mx-4 md:mx-8"></div>
			<div class="justify-center items-center text-[#888] flex-none">
				<div>
					<ul class="flex relative h-[28x] leading-[28px] overflow-hidden">
						<li
							:id="`${classNamePrefixGroup}${idx}_anchor`"
							class="anchor text-[14px] h-full"
							:style="{
								width: `${initWidth}px`,
								left: `${initLeft}px`,
							}"
						></li>
						<li
							v-for="(tab, i) in groupData.tab_list"
							:key="i"
							:data-index="i"
							:id="`${classNamePrefixGroupTab}${groupData.group_name}_${tab.tab_name}`"
							class="z-10 hover:text-[#007bff] hover:cursor-pointer active:text-[#007bff] active:font-bold px-3 text-[14px] transition-colors duration-200"
							:class="currTab === i ? 'active' : 'font-normal'"
							@mouseenter="slideTo(i)"
							@mouseleave="slideBack()"
							@click="switchTab(i)"
						>
							{{ tab.tab_name }}
						</li>
					</ul>
				</div>
				<div class="flex-fill"></div>
			</div>
			<div
				v-if="currentTabUpperRight"
				class="flex-grow text-right text-red-500 text-[14px] hidden md:block text-ellipsis overflow-x-hidden whitespace-nowrap"
			>
				<a
					class="hover:text-red-700"
					:href="currentTabUpperRight.url"
					target="_blank"
					>{{ currentTabUpperRight.title }}</a
				>
			</div>
		</header>
		<div
			class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 mt-[24px] cursor-pointer"
			role="list"
			:aria-label="`${groupData.group_name}工具列表`"
		>
			<StyleTooltip
				v-for="(item, t) in currentTabVisibleItems"
				:key="item.title"
				:content="item.description"
				:nowrap="true"
				:element-id="`desc-${idx}-${t}`"
				class="mb-[10px]"
				:class="showNumber <= t ? 'hidden' : ''"
				role="listitem"
			>
				<article>
					<a
						class="index-nav-group-content-item rounded-xl shadow shadow-warm-gray-500 items-center py-[8px] px-[8px] border-[1px] border-white"
						:href="item.url"
						target="_blank"
						rel="nofollow"
						:aria-label="`访问${item.title} - ${item.description}`"
						@mouseover="showToSourceIcon('show', idx, t)"
						@mouseout="showToSourceIcon('hide', idx, t)"
					>
<img
    class="index-nav-group-content-item-icon"
    :src="item.icon"
    loading="lazy"
/>
					<div class="index-nav-group-content-item-main">
						<h3 class="index-nav-group-content-item-name">{{ item.title }}</h3>
						<p :id="`desc-${idx}-${t}`" class="index-nav-group-content-item-desc">
							{{ item.description }}
						</p>
					</div>
					<div
						v-if="item.ori_url"
						:id="`to-source-icon-${idx}-${t}`"
						class="hidden h-full items-center"
						@click.stop="stop"
						@click="jumpOut(item.ori_url)"
					>
						<Icon
							size="18"
							class="flex items-center text-slate-400 hover:text-slate-500"
							name="uil:arrow-circle-right"
						></Icon>
					</div>
				</a>
				</article>
			</StyleTooltip>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, onMounted } from 'vue'
import { useRoute } from '#app'
import type { IGroup } from '~/interface/nav'
const props = defineProps<{
	groupData: IGroup
	idx: number
}>()

const classNamePrefixGroup = 'nav_group_'
const classNamePrefixGroupTab = 'nav_group_tab_'

const currTab = ref(0)
const isHovering = ref(false)
const showNumber = ref(100)

// 计算当前tab是否有可见项目
const currentTabHasVisibleItems = computed(() => {
	const currentTab = props.groupData.tab_list[currTab.value]
	if (!currentTab || !currentTab.details) return false
	return currentTab.details.filter((item) => item.is_show !== false).length > 0
})

// 计算当前tab的可见项目
const currentTabVisibleItems = computed(() => {
	const currentTab = props.groupData.tab_list[currTab.value]
	if (!currentTab || !currentTab.details) return []
	return currentTab.details.filter((item) => item.is_show !== false)
})

// 计算当前tab的右上角链接
const currentTabUpperRight = computed(() => {
	const currentTab = props.groupData.tab_list[currTab.value]
	return currentTab?.upper_right_corner || null
})

const padding = 12 // 左侧padding
const fontSize = 14 //字体大小
const scale = 0.6

const initWidth = ref(
	Math.round(props.groupData.tab_list[0].tab_name.length * fontSize * scale),
)
const initLeft = ref(0)

const updateAnchor = (tabIndex: number) => {
	const tab = props.groupData.tab_list[tabIndex]
	if (!tab) return

	const newWidth = Math.round(tab.tab_name.length * fontSize * scale)
	initWidth.value = newWidth

	let left = 0
	for (let i = 0; i < tabIndex; i++) {
		const prevTab = props.groupData.tab_list[i]
		left += padding * 2 + prevTab.tab_name.length * fontSize
	}
	left += Math.round(padding + (tab.tab_name.length * fontSize * (1 - scale)) / 2)

	// 使用nextTick确保DOM更新完成
	nextTick(() => {
		// 只在客户端执行，避免SSR问题
		if (process.client) {
			const anchor = document.getElementById(`${classNamePrefixGroup}${props.idx}_anchor`)
			if (anchor) {
				anchor.style.width = `${newWidth}px`
				anchor.style.transform = `translateX(${left}px)`
				anchor.style.transition = 'transform 0.3s, width 0.3s'
			}
		}
	})
}

// 切换数据
let rewrite = false
const switchTab = (val: number) => {
	// 确保tab索引在有效范围内
	if (val < 0 || val >= props.groupData.tab_list.length) {
		return
	}
	
	// 检查目标tab是否有可见的项目
	const targetTab = props.groupData.tab_list[val]
	if (!targetTab || !targetTab.details || !Array.isArray(targetTab.details)) {
		return
	}
	
	const visibleItems = targetTab.details.filter((item) => item.is_show !== false)
	if (visibleItems.length === 0) {
		return
	}
	
	currTab.value = val
	updateAnchor(val)
	if (rewrite) {
		history.pushState(null, '', ' ')
	}
}

// 初始化移动条位置
const getTranslateX = () => {
	updateAnchor(currTab.value)
}
getTranslateX()

// 移动条移动
const slideTo = (tabIndex: number) => {
	isHovering.value = true
	updateAnchor(tabIndex)
}

// 返回原位置
const slideBack = () => {
	isHovering.value = false
	updateAnchor(currTab.value)
}

// 展示源网站跳转按钮
const showToSourceIcon = (type: string, idx: number, t: number) => {
	// 只在客户端执行，避免SSR问题
	if (process.client) {
		const element = document.getElementById(`to-source-icon-${idx}-${t}`)
		if (element) {
			if (type == 'show') {
				element.classList.remove('hidden')
				element.classList.add('flex')
			} else {
				element.classList.remove('flex')
				element.classList.add('hidden')
			}
		}
	}
}

const jumpOut = (url: string) => {
	// 只在客户端执行，避免SSR问题
	if (process.client) {
		window.open(url + '?ref=https://www.fre123.com', '_blank')
	}
}

const stop = ($event) => {
	$event.stopPropagation()
	$event.preventDefault()
}

//自动定位
const located = () => {
	const route = useRoute()
	const hash = route.hash
	const routeGroupName = hash.replace('#', '').split('_')[0] ?? ''
	const routeTabName = hash.replace('#', '').split('_')[1] ?? ''

	if (routeTabName) {
		// 定位到分组
		const groupElement = document.getElementById(classNamePrefixGroup + routeGroupName)
		if (groupElement) {
			console.log('clientHeight', groupElement.offsetHeight)
			window.scrollTo({
				behavior: 'smooth',
				top: groupElement.offsetTop - 128,
			})
		}

		// 定位到子分类
		const tabElement = document.getElementById(
			classNamePrefixGroupTab + routeGroupName + '_' + routeTabName,
		)
		if (tabElement) {
			tabElement.click()
			getTranslateX()
		}
	}
}

onMounted(async () => {
	await located()
	rewrite = true
})
</script>

<style scoped>
.anchor {
	position: absolute;
	height: 28px;
	/* width: 20px; */
	bottom: 0;
	opacity: 1;
	z-index: 0;
	border-bottom: 1.5px solid #007bff;
}

.active {
	color: #007bff;
	font-weight: bold;
}

.index-nav-group {
	box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.07);
	transition: 0.3s;
}
.index-nav-group:hover {
	box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.07);
}

.index-nav-group-content {
	display: flex;
	align-items: center;
	height: 100%;
	flex-wrap: wrap;
}

.index-nav-group-header {
	display: flex;
	border-top: 1px solid rgba(0, 0, 0, 0.05);
	align-items: center;
	height: 100%;
	margin: 50px auto 20px auto;
	padding: 40px 0 0 0;
}

.index-nav-group-header-icon {
	height: 20px;
	margin-left: 10px;
}

.index-nav-group-content-item {
	display: flex;
	box-sizing: border-box;
	color: #434343;
	text-decoration: none;
	transition-property: transform, background-color;
	transition-duration: 1s, 1s;
	flex-shrink: 0;
	position: relative;
	transition: all 0.5s ease;
}

.index-nav-group-header-name {
	margin-left: 10px;
}

.index-nav-group-content-item:hover {
	z-index: 2;
	border-color: #efbb91;
	.index-nav-group-content-item-name {
		color: #007bff;
	}
	.to-source {
		display: flex;
	}
}
.index-nav-group-content-item:hover > img {
	transform: scale(1.07);
}

.index-nav-group-content-item-icon {
	width: 32px;
	height: 32px;
	border-radius: 5px;
	transition: all 0.6s;
}

.index-nav-group-content-item-main {
	margin-left: 10px;
	flex: 1;
	/* background-color: #40a6ff0f; */
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.index-nav-group-content-item-name {
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	flex: 1;
	flex-shrink: 0;
	min-width: 70px;
	/* background-color: rgba(170, 67, 67, 0.1); */
}
.index-nav-group-content-item-desc {
	font-size: 12px;
	height: 16px;
	color: #7f7e7e;
	/* background-color: #f951ff24; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.index-nav-group-content-item-desc:hover {
	display: block;
	white-space: normal;
	overflow: visible;
	-webkit-line-clamp: initial;
}
</style>
