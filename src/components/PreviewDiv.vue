<script setup lang="ts">
import { PreviewResolution } from '@/states/PreviewResolution';
import CameraCanvas from './CameraCanvas.vue';
import CameraStream from './CameraStream.vue';
</script>

<template>
  <div class="preview-div">
    <CameraStream />
    <CameraCanvas frame-name="Full" :resolution="PreviewResolution.resolution" />
    <div class="frame"></div>
    <div class="frame green-frame"></div>
  </div>
</template>

<style scoped>
.preview-div {
  position: relative;
  border: 1px solid #333;
}

.frame {
  border: 2px solid yellow;
  position: absolute;
  display: none;
}

.green-frame {
  border-color: green;
}
</style>