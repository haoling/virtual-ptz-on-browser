<script setup lang="ts">
import { PreviewResolution } from '@/states/PreviewResolution';
import CameraCanvas from './CameraCanvas.vue';
import FramePreview from './FramePreview.vue';
import { Frames, type FrameUpdatableProps } from '@/states/Frames';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import { VideoElement } from '@/states/VideoElement';
import { Camera } from '@/states/Camera';

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

const onResizeFrame = (payload: {frameName: string} & FrameUpdatableProps) => {
  // console.log('onResizeFrame', payload);

  const frame = Frames.getFrame(payload.frameName);
  if (!frame) {
    return;
  }

  if (!container.value) {
    return;
  }

  // 移動距離を、containerの幅、高さに対する割合に変換
  const deltaLeft = payload.left ? payload.left / container.value.clientWidth : 0;
  const deltaTop = payload.top ? payload.top / container.value.clientHeight : 0;
  const deltaRight = payload.right ? payload.right / container.value.clientWidth : 0;
  const deltaBottom = payload.bottom ? payload.bottom / container.value.clientHeight : 0;

  // console.log('frame', frame.left, frame.top, frame.right, frame.bottom);
  // console.log('delta', deltaLeft, deltaTop, deltaRight, deltaBottom);

  let left = frame.left + deltaLeft;
  let top = frame.top + deltaTop;
  let right = frame.right - deltaRight;
  let bottom = frame.bottom - deltaBottom;

  if (left < 0 || 1 - left - right <= 0) left = frame.left;
  if (top < 0 || 1 - top - bottom <= 0) top = frame.top;
  if (right > 1 || 1 - left - right <= 0) right = frame.right;
  if (bottom > 1 || 1 - top - bottom <= 0) bottom = frame.bottom;

  frame.update({left, top, right, bottom});
};

watch([() => Camera.streamMetadata?.width, () => Camera.streamMetadata?.height], handleResize);
</script>

<template>
  <div class="preview-wrapper p-1">
    <div class="preview-div" ref="container">
      <CameraCanvas class="camera-canvas" frame-name="Full" :resolution="PreviewResolution.resolution" />
      <FramePreview v-for="frame in Frames.frames" :key="frame.name" :frame-name="frame.name" @resizeFrame="onResizeFrame" />
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
.camera-canvas {
  position: relative;
  display: flex;
}
.preview-div {
  position: relative;
}
</style>