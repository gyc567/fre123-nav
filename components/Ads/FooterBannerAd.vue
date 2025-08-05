<template>
  <div class="footer-banner-ad">
    <GoogleAds
      :ad-client="adClient"
      ad-slot="0987654321"
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
.footer-banner-ad {
  width: 100%;
  max-width: 728px;
  margin: 20px auto;
  padding: 20px 0;
  border-top: 1px solid #e5e7eb;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .footer-banner-ad {
    max-width: 320px;
    margin: 15px auto;
    padding: 15px 0;
  }
}
</style>