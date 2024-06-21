<script setup lang="ts">
import { VideoElement } from '@/states/VideoElement';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const projectorWindow = ref<Window | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

const onClick = () => {
  if (projectorWindow.value) {
    projectorWindow.value.close();
  }

  projectorWindow.value = window.open("", "", "width=640,height=480");
  if (! projectorWindow.value || ! VideoElement.element) {
    return;
  }
  projectorWindow.value.document.write('<title>プロジェクター画面</title>');
  canvas.value = document.createElement('canvas');
  canvas.value.style.aspectRatio = (VideoElement.element.videoWidth / VideoElement.element.videoHeight).toString();
  context.value = canvas.value.getContext('2d');
  canvas.value.width = VideoElement.element.videoWidth;
  canvas.value.height = VideoElement.element.videoHeight;
  canvas.value.style.maxWidth = '100%';
  canvas.value.style.maxHeight = '100%';
  projectorWindow.value.document.write('<body style="margin: 0;">');
  projectorWindow.value.document.body.appendChild(canvas.value);
}

const draw = () => {
  if (! context.value) {
    return;
  }
  if (VideoElement.element) {
    context.value.drawImage(VideoElement.element, 0, 0, VideoElement.element.videoWidth, VideoElement.element.videoHeight);
  }
  requestAnimationFrame(draw);
}

watch(() => context.value, () => {
  draw();
});

const onBeforeUnmount = () => {
  if (projectorWindow.value) {
    projectorWindow.value.close();
    projectorWindow.value = null;
    canvas.value = null;
    context.value = null;
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', onBeforeUnmount);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', onBeforeUnmount);
});
</script>

<template>
  <button class="projectorButton" @click="onClick">プロジェクター画面を開く</button>
</template>

<style scoped>
.projectorButton {
  margin-top: 10px;
}
</style>