<script setup lang="ts">
import { Frames } from '@/states/Frames';
import { VideoElement } from '@/states/VideoElement';
import debounce from 'lodash.debounce';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const canvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;

const props = defineProps<{
  frameIndex: number,
}>();

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
    const frame = Frames.frames[props.frameIndex];
    // fit inner box with keep aspect ratio
    const scale = Math.min(canvas1.width / frame.width, canvas1.height / frame.height);
    const width = frame.width * scale;
    const height = frame.height * scale;
    const left = (canvas1.width - width) / 2;
    const top = (canvas1.height - height) / 2;
    context.drawImage(videoElement, frame.left, frame.top, frame.width, frame.height, left, top, width, height);
  } else if (canvas.value) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  requestAnimationFrame(draw);
}

watch(() => canvas.value, (canvas) => {
  if (canvas) {
    context = canvas.getContext('2d')!;
  }
});

watch([() => Frames.frames[props.frameIndex].width, () => Frames.frames[props.frameIndex].height], () => {
  if (canvas.value && context) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
});

const handleResize = debounce(() => {
  if (canvas.value) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;
  }
}, 100)
</script>

<template>
  <div class="canvas-container">
    <canvas class="preview-canvas" ref="canvas" width="800" height="800"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>