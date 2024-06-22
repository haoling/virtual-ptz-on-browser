<script setup lang="ts">
import { Frame, Frames } from '@/states/Frames';
import { computed, ref } from 'vue';
import ResizeHandles, { type ResizeCorner } from './ResizeHandles.vue';
import FrameName from './FrameName.vue';

const props = withDefaults(defineProps<{
  frame: Frame,
  isGreen?: boolean
}>(), {isGreen: false});

const emit = defineEmits({
  resizeFrame(payload: {frame: Frame, corner: ResizeCorner, dx: number, dy: number}) {
    return true;
  }
})

const frameDiv = ref<HTMLDivElement | null>(null);
const modifiable = computed(() => Frames.modifingFrame === props.frame);
const borderClasses = computed(() => {
  const classes: string[] = ["frame"];
  if (props.isGreen) {
    classes.push('green-frame');
  } else if (props.frame.isSystem) {
    classes.push('gray-frame');
  }
  if (modifiable.value) {
    classes.push('modifiable-frame');
  }
  return classes;
});

const onResizeFrame = (payload: {corner: ResizeCorner, dx: number, dy: number}) => {
  emit('resizeFrame', {frame: props.frame, ...payload});
};
</script>

<template>
  <div :class="borderClasses" :style="props.frame.toStyle()" ref="frameDiv">
    <FrameName v-if="! frame?.isSystem && ! modifiable" :frameName="props.frame.name"/>
    <ResizeHandles v-if="modifiable && frame" :frame="frame" @resizeFrame="onResizeFrame" />
  </div>
</template>

<style scoped>
.frame {
  background-image: repeating-linear-gradient(-60deg, #e1ff00, #e1ff00 1px, transparent 1px, transparent 2px, #e1ff00 2px), repeating-linear-gradient(30deg, #e1ff00, #e1ff00 1px, transparent 1px, transparent 2px, #e1ff00 2px), repeating-linear-gradient(120deg, #e1ff00, #e1ff00 1px, transparent 1px, transparent 2px, #e1ff00 2px), repeating-linear-gradient(210deg, #e1ff00, #e1ff00 1px, transparent 1px, transparent 2px, #e1ff00 2px);
  background-size: 3px 100%, 100% 3px, 3px 100% , 100% 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  position: absolute;
}

.gray-frame {
  background-image: repeating-linear-gradient(-60deg, gray, gray 1px, transparent 1px, transparent 2px, gray 2px), repeating-linear-gradient(30deg, gray, gray 1px, transparent 1px, transparent 2px, gray 2px), repeating-linear-gradient(120deg, gray, gray 1px, transparent 1px, transparent 2px, gray 2px), repeating-linear-gradient(210deg, gray, gray 1px, transparent 1px, transparent 2px, gray 2px);
  border-color: gray;
}

.green-frame {
  background-image: repeating-linear-gradient(-60deg, #00ba03, #00ba03 1px, transparent 1px, transparent 2px, #00ba03 2px), repeating-linear-gradient(30deg, #00ba03, #00ba03 1px, transparent 1px, transparent 2px, #00ba03 2px), repeating-linear-gradient(120deg, #00ba03, #00ba03 1px, transparent 1px, transparent 2px, #00ba03 2px), repeating-linear-gradient(210deg, #00ba03, #00ba03 1px, transparent 1px, transparent 2px, #00ba03 2px);
  border-color: green;
}

.modifiable-frame {
  background-image: repeating-linear-gradient(0deg, #e1ff00, #e1ff00 10px, transparent 10px, transparent 20px, #e1ff00 20px), repeating-linear-gradient(90deg, #e1ff00, #e1ff00 10px, transparent 10px, transparent 20px, #e1ff00 20px), repeating-linear-gradient(180deg, #e1ff00, #e1ff00 10px, transparent 10px, transparent 20px, #e1ff00 20px), repeating-linear-gradient(270deg, #e1ff00, #e1ff00 10px, transparent 10px, transparent 20px, #e1ff00 20px);
  background-size: 3px calc(100% + 20px), calc(100% + 20px) 3px, 3px calc(100% + 20px) , calc(100% + 20px) 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  animation: borderAnimation 0.9s infinite linear;
}

@keyframes borderAnimation {
  from { background-position: 0 0, -20px 0, 100% -20px, 0 100%; }
  to { background-position: 0 -20px, 0 0, 100% 0, -20px 100%; }
}
</style>