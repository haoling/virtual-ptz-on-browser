<script setup lang="ts">
import type { Frame } from '@/states/Frames';
import ResizeHandle from './ResizeHandle.vue';

export type ResizeCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

defineProps<{
  frame: Frame
}>();

const emit = defineEmits({
  resizeFrame(payload: {corner: ResizeCorner, dx: number, dy: number}) {
    return true;
  }
})

const onResizeFrame = (corner: ResizeCorner, {dx, dy} : {dx: number, dy: number}) => {
  emit('resizeFrame', {corner, dx, dy});
};
</script>

<template>
  <!-- <ResizeHandle class="top-left" :frame="frame" @resizeFrame="(moves) => onResizeFrame('top-left', moves)" /> -->
  <!-- <ResizeHandle class="top-right" :frame="frame" @resizeFrame="(moves) => onResizeFrame('top-right', moves)" /> -->
  <!-- <ResizeHandle class="bottom-left" :frame="frame" @resizeFrame="(moves) => onResizeFrame('bottom-left', moves)" /> -->
  <ResizeHandle class="bottom-right" :frame="frame" @resizeFrame="(moves) => onResizeFrame('bottom-right', moves)" />
  <ResizeHandle class="center" :frame="frame" @resizeFrame="(moves) => onResizeFrame('center', moves)" />
</template>

<style scoped>
.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: move;
}
</style>
