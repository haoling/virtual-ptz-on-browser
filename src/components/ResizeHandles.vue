<script setup lang="ts">
import type { FrameUpdatableProps } from '@/states/Frames';
import ResizeHandle from './ResizeHandle.vue';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

defineProps<{
  frameName: string
}>();

const emit = defineEmits({
  resizeFrame(payload: FrameUpdatableProps) {
    if (payload.left === undefined && payload.top === undefined && payload.right === undefined && payload.bottom === undefined) {
      return false;
    }
    return true;
  }
})

const onResizeFrame = (corner: Corner, {dx, dy} : {dx: number, dy: number}) => {
  if (corner === 'top-left') {
    emit('resizeFrame', {left: dx, top: dy});
  } else if (corner === 'top-right') {
    emit('resizeFrame', {right: dx, top: dy});
  } else if (corner === 'bottom-left') {
    emit('resizeFrame', {left: dx, bottom: dy});
  } else if (corner === 'bottom-right') {
    emit('resizeFrame', {right: dx, bottom: dy});
  }
};
</script>

<template>
  <ResizeHandle class="top-left" @resizeFrame="(moves) => onResizeFrame('top-left', moves)" />
  <ResizeHandle class="top-right" @resizeFrame="(moves) => onResizeFrame('top-right', moves)" />
  <ResizeHandle class="bottom-left" @resizeFrame="(moves) => onResizeFrame('bottom-left', moves)" />
  <ResizeHandle class="bottom-right" @resizeFrame="(moves) => onResizeFrame('bottom-right', moves)" />
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
