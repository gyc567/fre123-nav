<template>
  <div class="header-banner-ad">
    <GoogleAds
      :ad-client="adClient"
      ad-slot="1234567890"
      ad-format="auto"
      :width="728"
      :height="90"
      full-width-responsive="true"
    />
  </div>
</template>

<script setup>
import GoogleAds from './GoogleAds.vue'

// 你需要替换为真实的 Google AdSense 发布商 ID
const adClient = 'ca-pub-7922656429626044'
</script>

<style scoped>
.header-banner-ad {
  width: 100%;
  max-width: 728px;
  margin: 0 auto;
  padding: 10px 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .header-banner-ad {
    max-width: 320px;
  }
}
</style>