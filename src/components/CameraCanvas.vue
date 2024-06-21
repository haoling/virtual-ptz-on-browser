<script setup lang="ts">
import { Frames } from '@/states/Frames';
import { VideoElement } from '@/states/VideoElement';
import { onMounted, ref, watch } from 'vue';

const canvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;

const props = defineProps<{
  frameIndex: number,
}>();

onMounted(() => {
  requestAnimationFrame(draw);
});

const draw = () => {
  if (canvas.value && VideoElement.element) {
    const canvas1 = canvas.value;
    const videoElement = VideoElement.element;
    const frame = Frames.frames[props.frameIndex];
    context.drawImage(videoElement, frame.left, frame.top, frame.width, frame.height, 0, 0, canvas1.width, canvas1.height);
  }
  requestAnimationFrame(draw);
}

watch(() => canvas.value, (canvas) => {
  if (canvas) {
    context = canvas.getContext('2d')!;
  }
});
</script>

<template>
  <canvas ref="canvas" width="800" height="600"></canvas>
</template>