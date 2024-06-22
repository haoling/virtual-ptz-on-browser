<script setup lang="ts">
import { PreviewResolution } from '@/states/PreviewResolution';
import CameraCanvas from './CameraCanvas.vue';
import FramePreview from './FramePreview.vue';
import { Frames } from '@/states/Frames';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import debounce from 'lodash.debounce';
import { VideoElement } from '@/states/VideoElement';

const container = ref<HTMLDivElement>();

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = debounce(() => {
  if (container.value && VideoElement.element) {
    const videoWidth = VideoElement.element.videoWidth;
    const videoHeight = VideoElement.element.videoHeight;
    
    // // set aspect-ratio css
    const aspectRatio = videoWidth / videoHeight;
    container.value.style.aspectRatio = aspectRatio.toFixed(2);

    // fit canvas to container
    container.value.style.width = '100%';
    container.value.style.height = '100%';
    if (aspectRatio > (container.value.clientWidth / container.value.clientHeight)) {
      container.value.style.width = '100%';
      container.value.style.height = 'fit-content';
    } else {
      container.value.style.width = 'fit-content';
      container.value.style.height = '100%';
    }
  } else {
    console.log('no video element');
  }
}, 100)
</script>

<template>
  <div class="preview-wrapper">
    <div class="preview-div" ref="container">
      <CameraCanvas frame-name="Full" :resolution="PreviewResolution.resolution" />
      <FramePreview v-for="frame in Frames.frames" :key="frame.name" :frame-name="frame.name" />
    </div>
  </div>
</template>

<style scoped>
.preview-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.preview-div {
  position: relative;
  border: 1px solid #333;
}
</style>