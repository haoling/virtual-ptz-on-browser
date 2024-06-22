<script setup lang="ts">
import { Frames, type FrameUpdatableProps } from '@/states/Frames';
import { computed, ref, watch } from 'vue';
import ResizeHandles from './ResizeHandles.vue';
import FrameName from './FrameName.vue';

const props = withDefaults(defineProps<{
  frameName: string
  modifiable?: boolean
}>(), { modifiable: false });

const emit = defineEmits({
  resizeFrame(payload: {frameName: string} & FrameUpdatableProps) {
    if (Frames.getFrame(payload.frameName) === undefined) {
      return false;
    }
    if (payload.left === undefined && payload.top === undefined && payload.right === undefined && payload.bottom === undefined) {
      return false;
    }
    return true;
  }
})

const frame = computed(() => Frames.getFrame(props.frameName));
const frameDiv = ref<HTMLDivElement | null>(null);
const frameRect = computed(() => {
  if (!frame.value) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    };
  }

  return frame.value.toStyle();
});

const onResizeFrame = (payload: FrameUpdatableProps) => {
  emit('resizeFrame', {frameName: props.frameName, ...payload});
};
</script>

<template>
  <div class="frame" :class="{ 'green-frame': frame?.isSystem, 'modifiable-frame': props.modifiable }" :style="frameRect" ref="frameDiv">
    <FrameName v-if="! frame?.isSystem && ! props.modifiable" :frameName="frameName"/>
    <ResizeHandles v-if="props.modifiable && frame" :frameName="frameName" @resizeFrame="onResizeFrame" />
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