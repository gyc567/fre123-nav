<template>
  <div class="test-page">
    <h1>导航组件测试页面</h1>
    
    <div class="test-section">
      <h2>原始数据检查</h2>
      <pre>{{ JSON.stringify(navList?.[0], null, 2) }}</pre>
    </div>
    
    <div class="test-section">
      <h2>导航组件渲染</h2>
      <IndexNavGroup 
        v-if="navList && navList[0]" 
        :idx="0" 
        :groupData="navList[0]"
      />
      <div v-else class="error">
        无法加载导航数据
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import navList from '../config/nav.json'

onMounted(() => {
  console.log('Test page - NavList:', navList)
})
</script>

<style scoped>
.test-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.test-section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.test-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
}

.error {
  color: #dc2626;
  font-weight: 600;
}
</style>