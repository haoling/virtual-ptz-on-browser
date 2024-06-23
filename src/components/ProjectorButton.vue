<script setup lang="ts">
import { Camera } from '@/states/Camera';
import { Frame } from '@/states/Frames';
import { VideoElement } from '@/states/VideoElement';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  frame: Frame
  text?: string
  btnClass?: string
}>(), {text: "Open projection window", btnClass: "btn-primary"})

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
  projectorWindow.value.document.write(`<title>Projection [${Camera.device?.label}] ${props.frame.name}</title>`);
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
  if (VideoElement.element && canvas.value) {
    const sx = props.frame.left * VideoElement.element.videoWidth;
    const sy = props.frame.top * VideoElement.element.videoHeight;
    const sw = ((1 - props.frame.right) - props.frame.left) * VideoElement.element.videoWidth;
    const sh = ((1 - props.frame.bottom) - props.frame.top) * VideoElement.element.videoHeight;
    context.value.drawImage(VideoElement.element, sx, sy, sw, sh, 0, 0, canvas.value.width, canvas.value.height);
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

watch(() => Camera.device, onBeforeUnmount);
</script>

<template>
  <button class="btn" :class="btnClass" @click="onClick">{{text}}</button>
</template>
