<script setup lang="ts">
import { PreviewResolution } from '@/states/PreviewResolution';
import CameraCanvas from './CameraCanvas.vue';
import FramePreview from './FramePreview.vue';
import { Frame, Frames, type FrameUpdatableProps } from '@/states/Frames';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import { VideoElement } from '@/states/VideoElement';
import { Camera } from '@/states/Camera';
import type { ResizeCorner } from './ResizeHandles.vue';
import PtzFrame from './PtzFrame.vue';

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

const onResizeFrame = (payload: {frame: Frame, corner: ResizeCorner, dx: number, dy: number}) => {
  // console.log('onResizeFrame', payload);

  const frame = payload.frame;
  if (!frame) {
    return;
  }

  if (!container.value) {
    return;
  }

  const backup = frame.getBackup();
  if (! backup) {
    return;
  }

  if (! VideoElement.element) {
    return;
  }

  let dx = payload.dx;
  let dy = payload.dy;

  // X方向かY方向、移動量が大きい方に合わせて、VideElementのアスペクト比に合わせる
  const aspectRatio = VideoElement.element.videoWidth / VideoElement.element.videoHeight;
  if (payload.corner != "center") {
    if (Math.abs(payload.dx) > Math.abs(payload.dy)) {
      dy = dx / aspectRatio;
    } else {
      dx = dy * aspectRatio;
    }
  }

  // 移動距離を、containerの幅、高さに対する割合に変換
  dx = dx / container.value.clientWidth;
  dy = dy / container.value.clientHeight;

  let left = backup.left;
  let top = backup.top;
  let right = backup.right;
  let bottom = backup.bottom;
  /*
  if (payload.corner == "top-left") {
    left += dx;
    top += dy;
  } else if (payload.corner == "top-right") {
    right -= dx;
    top += dy;
  } else if (payload.corner == "bottom-left") {
    left += dx;
    bottom -= dy;
  } else*/ if (payload.corner == "bottom-right") {
    right -= dx;
    bottom -= dy;
  } else if (payload.corner == "center") {
    left += dx;
    top += dy;
    right -= dx;
    bottom -= dy;
  }

  // console.log('frame', left, top, right, bottom);

  if (left < 0 || 1 - left - right <= 0.05) return;
  if (top < 0 || 1 - top - bottom <= 0.05) return;
  if (right < 0 || 1 - left - right <= 0.05) return;
  if (bottom< 0 || 1 - top - bottom <= 0.05) return;

  frame.update({left, top, right, bottom});
};

watch([() => Camera.streamMetadata?.width, () => Camera.streamMetadata?.height], handleResize);
</script>

<template>
  <div class="preview-wrapper p-1">
    <div class="preview-div" ref="container">
      <CameraCanvas class="camera-canvas" :frame="Frames.getDefaultFrame()" :resolution="PreviewResolution.resolution" />
      <FramePreview v-for="frame in Frames.frames" :key="frame.name" :frame="frame" @resizeFrame="onResizeFrame" v-show="Frames.modifingFrame == null || Frames.modifingFrame === frame" />
      <PtzFrame :preViewDiv="container" v-show="Frames.modifingFrame == null" />
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