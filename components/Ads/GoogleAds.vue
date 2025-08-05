<template>
  <div class="google-ads-container">
    <!-- Google AdSense 广告位 -->
    <div v-if="!isAdBlocked" class="ads-wrapper">
      <ins 
        class="adsbygoogle"
        :style="adStyle"
        :data-ad-client="adClient"
        :data-ad-slot="adSlot"
        :data-ad-format="adFormat"
        :data-full-width-responsive="fullWidthResponsive"
      ></ins>
    </div>
    
    <!-- 广告被屏蔽时的提示 -->
    <div v-else class="ad-fallback">
      <div class="text-center py-8 px-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <p class="text-gray-600 text-sm">
          🚀 支持我们的免费服务，请考虑关闭广告拦截器
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Props
const props = defineProps({
  adClient: {
    type: String,
    default: 'ca-pub-7922656429626044' // 替换为你的 Google AdSense 发布商 ID
  },
  adSlot: {
    type: String,
    required: true
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  fullWidthResponsive: {
    type: String,
    default: 'true'
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  }
})

// 响应式数据
const isAdBlocked = ref(false)

// 计算广告样式
const adStyle = computed(() => {
  const style = {
    display: 'block'
  }
  
  if (props.width !== 'auto') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height !== 'auto') {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})

// 检测广告拦截器
const detectAdBlocker = () => {
  const testAd = document.createElement('div')
  testAd.innerHTML = '&nbsp;'
  testAd.className = 'adsbox'
  testAd.style.cssText = 'position:absolute;left:-10000px;'
  document.body.appendChild(testAd)
  
  setTimeout(() => {
    if (testAd.offsetHeight === 0) {
      isAdBlocked.value = true
    }
    document.body.removeChild(testAd)
  }, 100)
}

// 加载 Google AdSense 脚本
const loadAdSenseScript = () => {
  if (document.querySelector('script[src*="adsbygoogle.js"]')) {
    return
  }
  
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  script.setAttribute('data-ad-client', props.adClient)
  document.head.appendChild(script)
}

// 初始化广告
const initAd = async () => {
  await nextTick()
  
  if (window.adsbygoogle && !isAdBlocked.value) {
    try {
      window.adsbygoogle.push({})
    } catch (error) {
      console.warn('AdSense initialization failed:', error)
    }
  }
}

onMounted(() => {
  detectAdBlocker()
  loadAdSenseScript()
  
  // 延迟初始化广告，确保脚本加载完成
  setTimeout(() => {
    initAd()
  }, 1000)
})
</script>

<style scoped>
.google-ads-container {
  width: 100%;
  margin: 0 auto;
}

.ads-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.adsbygoogle {
  background-color: transparent;
}

.ad-fallback {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .google-ads-container {
    padding: 0 10px;
  }
}
</style>