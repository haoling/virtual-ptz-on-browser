<script setup lang="ts">
import { Frame, Frames } from '@/states/Frames';
import { PreviewResolution } from '@/states/PreviewResolution';
import { VideoElement } from '@/states/VideoElement';
import debounce from 'lodash.debounce';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Camera } from '@/states/Camera';

const canvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;

const props = withDefaults(defineProps<{
  frame: Frame,
  resolution: number
}>(), {resolution: 640});

onMounted(() => {
  requestAnimationFrame(draw);
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const draw = () => {
  if (canvas.value && VideoElement.element && VideoElement.element.srcObject) {
    const canvas1 = canvas.value;
    const videoElement = VideoElement.element;
    const frame = props.frame;
    context.drawImage(videoElement, videoElement.videoWidth * frame.left, videoElement.videoHeight * frame.top, videoElement.videoWidth * frame.width, videoElement.videoHeight * frame.height, 0, 0, canvas1.width, canvas1.height);
  } else if (canvas.value) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  requestAnimationFrame(draw);
}

const handleResize = debounce(() => {
  if (canvas.value && VideoElement.element) {
    const frame = props.frame;
    const frameWidth = VideoElement.element.videoWidth * frame.width;
    const frameHeight = VideoElement.element.videoHeight * frame.height;
    const scale = Math.min(props.resolution / frameWidth, props.resolution / frameHeight);
    canvas.value.width = frameWidth * scale;
    canvas.value.height = frameHeight * scale;
  } else {
    console.log('no video element');
  
  }
}, 100)

watch(() => canvas.value, (canvas) => {
  if (canvas) {
    context = canvas.getContext('2d')!;
  }
});

watch([() => props.frame.width, () => props.frame.height, () => Camera.streamMetadata?.width, () => Camera.streamMetadata?.height], () => {
  if (canvas.value && context) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  handleResize();
});

watch(() => PreviewResolution.resolution, handleResize);
</script>

<template>
  <canvas class="preview-canvas" ref="canvas" width="800" height="800"></canvas>
</template>

<style scoped>
.preview-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>