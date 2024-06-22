<script setup lang="ts">
import type { Frame } from '@/states/Frames';
import ResizeHandle from './ResizeHandle.vue';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

defineProps<{
  frame: Frame
}>();

const emit = defineEmits({
  resizeFrame(payload: {corner: Corner, dx: number, dy: number}) {
    return true;
  }
})

const onResizeFrame = (corner: Corner, {dx, dy} : {dx: number, dy: number}) => {
  emit('resizeFrame', {corner, dx, dy});
};
</script>

<template>
  <ResizeHandle class="top-left" :frame="frame" @resizeFrame="(moves) => onResizeFrame('top-left', moves)" />
  <ResizeHandle class="top-right" :frame="frame" @resizeFrame="(moves) => onResizeFrame('top-right', moves)" />
  <ResizeHandle class="bottom-left" :frame="frame" @resizeFrame="(moves) => onResizeFrame('bottom-left', moves)" />
  <ResizeHandle class="bottom-right" :frame="frame" @resizeFrame="(moves) => onResizeFrame('bottom-right', moves)" />
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
</style>
