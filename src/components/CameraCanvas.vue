<script setup lang="ts">
import { Frames } from '@/states/Frames';
import { PreviewResolution } from '@/states/PreviewResolution';
import { VideoElement } from '@/states/VideoElement';
import debounce from 'lodash.debounce';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const container = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;

const props = withDefaults(defineProps<{
  frameName: string,
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
    const frame = Frames.getFrame(props.frameName);
    if (!frame) {
      return;
    }
    context.drawImage(videoElement, frame.left, frame.top, frame.width, frame.height, 0, 0, canvas1.width, canvas1.height);
  } else if (canvas.value) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  requestAnimationFrame(draw);
}

const handleResize = debounce(() => {
  if (canvas.value) {
    const frame = Frames.getFrame(props.frameName);
    if (!frame) {
      return;
    }
    const scale = Math.min(props.resolution / frame.width, props.resolution / frame.height);
    canvas.value.width = frame.width * scale;
    canvas.value.height = frame.height * scale;
    
    // set aspect-ratio css
    const aspectRatio = frame.width / frame.height;
    canvas.value.style.aspectRatio = aspectRatio.toFixed(2);

    if (container.value) {
      // fit canvas to container
      canvas.value.style.width = '100%';
      canvas.value.style.height = '100%';
      if (aspectRatio > (container.value.clientWidth / container.value.clientHeight)) {
        canvas.value.style.width = '100%';
        canvas.value.style.height = 'auto';
      } else {
        canvas.value.style.width = 'auto';
        canvas.value.style.height = '100%';
      }
    }
  }
}, 100)

watch(() => canvas.value, (canvas) => {
  if (canvas) {
    context = canvas.getContext('2d')!;
  }
});

watch([() => Frames.getFrame(props.frameName)?.width, () => Frames.getFrame(props.frameName)?.height], () => {
  if (canvas.value && context) {
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  handleResize();
});

watch(() => PreviewResolution.resolution, handleResize);
</script>

<template>
  <div class="canvas-container" ref="container">
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