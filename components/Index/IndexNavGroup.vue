<template>
	<section
		v-if="!hasRenderError && currentTabHasVisibleItems"
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
			class="nav-grid-container"
			role="list"
			:aria-label="`${groupData.group_name}工具列表`"
		>
			<div
				v-for="(item, t) in currentTabVisibleItems"
				:key="`${item.title}-${t}`"
				class="nav-item-wrapper"
				:class="showNumber <= t ? 'hidden' : ''"
				role="listitem"
			>
				<article class="nav-item-card">
					<a
						class="nav-item-link"
						:href="item.url"
						target="_blank"
						rel="nofollow"
						:aria-label="`访问${item.title} - ${item.description}`"
						@mouseover="showToSourceIcon('show', idx, t)"
						@mouseout="showToSourceIcon('hide', idx, t)"
					>
						<img
							class="nav-item-icon"
							:src="item.icon"
							:alt="`${item.title}图标`"
							loading="lazy"
							@error="handleImageError"
						/>
						<div class="nav-item-content">
							<h3 class="nav-item-title">{{ item.title }}</h3>
							<p 
								:id="`desc-${idx}-${t}`" 
								class="nav-item-desc"
								:title="item.description"
							>
								{{ item.description }}
							</p>
						</div>
						<div
							v-if="item.ori_url"
							:id="`to-source-icon-${idx}-${t}`"
							class="nav-item-action hidden"
							@click.stop="stop"
							@click="jumpOut(item.ori_url)"
						>
							<Icon
								size="18"
								class="action-icon"
								name="uil:arrow-circle-right"
							></Icon>
						</div>
					</a>
				</article>
			</div>
		</div>
	</section>
	
	<!-- 错误边界 -->
	<div v-else-if="hasRenderError" class="error-fallback">
		<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">
						导航组件加载失败
					</h3>
					<div class="mt-2 text-sm text-red-700">
						<p>{{ groupData?.group_name || '未知分组' }} 的数据结构异常，请检查配置文件。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
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
const hasRenderError = ref(false)

// 验证数据结构
const validateGroupData = () => {
	try {
		if (!props.groupData) {
			console.error('GroupData is missing')
			hasRenderError.value = true
			return false
		}
		
		if (!props.groupData.tab_list || !Array.isArray(props.groupData.tab_list)) {
			console.error('Tab list is missing or invalid')
			hasRenderError.value = true
			return false
		}
		
		if (props.groupData.tab_list.length === 0) {
			console.error('Tab list is empty')
			hasRenderError.value = true
			return false
		}
		
		return true
	} catch (error) {
		console.error('Error validating group data:', error)
		hasRenderError.value = true
		return false
	}
}

// 计算当前tab是否有可见项目
const currentTabHasVisibleItems = computed(() => {
	try {
		if (!props.groupData || !props.groupData.tab_list || !Array.isArray(props.groupData.tab_list)) {
			return false
		}
		const currentTab = props.groupData.tab_list[currTab.value]
		if (!currentTab || !currentTab.details || !Array.isArray(currentTab.details)) {
			return false
		}
		return currentTab.details.filter((item) => item && item.is_show !== false).length > 0
	} catch (error) {
		console.error('Error checking visible items:', error)
		return false
	}
})

// 计算当前tab的可见项目
const currentTabVisibleItems = computed(() => {
	try {
		if (!props.groupData || !props.groupData.tab_list || !Array.isArray(props.groupData.tab_list)) {
			return []
		}
		const currentTab = props.groupData.tab_list[currTab.value]
		if (!currentTab || !currentTab.details || !Array.isArray(currentTab.details)) {
			return []
		}
		return currentTab.details.filter((item) => item && item.is_show !== false && item.title && item.url)
	} catch (error) {
		console.error('Error getting visible items:', error)
		return []
	}
})

// 计算当前tab的右上角链接
const currentTabUpperRight = computed(() => {
	const currentTab = props.groupData.tab_list[currTab.value]
	return currentTab?.upper_right_corner || null
})

const padding = 12 // 左侧padding
const fontSize = 14 //字体大小
const scale = 0.6

const initWidth = ref(0)
const initLeft = ref(0)

// 安全初始化宽度
const initializeWidth = () => {
	try {
		if (props.groupData && props.groupData.tab_list && props.groupData.tab_list[0]) {
			initWidth.value = Math.round(props.groupData.tab_list[0].tab_name.length * fontSize * scale)
		}
	} catch (error) {
		console.error('Error initializing width:', error)
		initWidth.value = 60 // 默认宽度
	}
}

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
	if (validateGroupData()) {
		updateAnchor(currTab.value)
	}
}

// 初始化
initializeWidth()
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

// 图片加载错误处理
const handleImageError = (event: Event) => {
	const target = event.target as HTMLImageElement
	if (target) {
		target.src = '/default-icon.svg' // 使用默认图标
		target.onerror = null // 防止无限循环
	}
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
	// 验证数据结构
	if (!validateGroupData()) {
		return
	}
	
	// 调试信息
	console.log('NavGroup mounted:', {
		groupName: props.groupData.group_name,
		tabCount: props.groupData.tab_list.length,
		currentTab: currTab.value,
		visibleItems: currentTabVisibleItems.value.length
	})
	
	await located()
	rewrite = true
})
</script>

<style scoped>
/* 标签切换相关样式 */
.anchor {
	position: absolute;
	height: 28px;
	bottom: 0;
	opacity: 1;
	z-index: 0;
	border-bottom: 1.5px solid #007bff;
}

.active {
	color: #007bff;
	font-weight: bold;
}

/* 导航组样式 */
.index-nav-group {
	box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.07);
	transition: 0.3s;
}

.index-nav-group:hover {
	box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.07);
}

/* 网格容器 - 使用更强的样式确保生效 */
.nav-grid-container {
	display: grid !important;
	grid-template-columns: repeat(2, 1fr) !important;
	gap: 1rem !important;
	margin-top: 1.5rem !important;
	width: 100% !important;
}

@media (min-width: 768px) {
	.nav-grid-container {
		grid-template-columns: repeat(3, 1fr) !important;
	}
}

@media (min-width: 1024px) {
	.nav-grid-container {
		grid-template-columns: repeat(4, 1fr) !important;
	}
}

@media (min-width: 1280px) {
	.nav-grid-container {
		grid-template-columns: repeat(5, 1fr) !important;
	}
}

/* 导航项包装器 */
.nav-item-wrapper {
	margin-bottom: 0.5rem;
}

/* 导航项卡片 */
.nav-item-card {
	height: 100%;
}

/* 导航项链接 */
.nav-item-link {
	display: flex;
	align-items: center;
	padding: 0.75rem;
	background-color: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 0.75rem;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	text-decoration: none;
	color: #374151;
	transition: all 0.3s ease;
	position: relative;
	height: 100%;
	min-height: 80px;
}

.nav-item-link:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
	border-color: #3b82f6;
}

/* 导航项图标 */
.nav-item-icon {
	width: 32px;
	height: 32px;
	border-radius: 0.375rem;
	object-fit: cover;
	flex-shrink: 0;
	transition: transform 0.3s ease;
}

.nav-item-link:hover .nav-item-icon {
	transform: scale(1.1);
}

/* 导航项内容 */
.nav-item-content {
	margin-left: 0.75rem;
	flex: 1;
	min-width: 0;
}

/* 导航项标题 */
.nav-item-title {
	font-size: 0.875rem;
	font-weight: 600;
	color: #111827;
	margin: 0 0 0.25rem 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.25;
}

.nav-item-link:hover .nav-item-title {
	color: #3b82f6;
}

/* 导航项描述 */
.nav-item-desc {
	font-size: 0.75rem;
	color: #6b7280;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.25;
}

/* 导航项操作按钮 */
.nav-item-action {
	margin-left: 0.5rem;
	align-items: center;
	cursor: pointer;
}

.nav-item-action.hidden {
	display: none !important;
}

.nav-item-link:hover .nav-item-action {
	display: flex !important;
}

.action-icon {
	color: #9ca3af;
	transition: color 0.2s ease;
}

.action-icon:hover {
	color: #6b7280;
}

/* 响应式调整 */
@media (max-width: 640px) {
	.nav-item-link {
		padding: 0.5rem;
		min-height: 70px;
	}
	
	.nav-item-icon {
		width: 28px;
		height: 28px;
	}
	
	.nav-item-content {
		margin-left: 0.5rem;
	}
	
	.nav-item-title {
		font-size: 0.8125rem;
	}
	
	.nav-item-desc {
		font-size: 0.6875rem;
	}
}

/* 错误状态 */
.nav-item-icon[src="/default-icon.svg"] {
	background-color: #f3f4f6;
	border: 1px solid #e5e7eb;
}
</style>
