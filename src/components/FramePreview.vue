<script setup lang="ts">
import { Frames } from '@/states/Frames';
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  frameName: string
  modifiable: boolean
}>(), { modifiable: false });

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

  return {
    left: `${(frame.value.left * 100).toFixed(0)}%`,
    top: `${(frame.value.top * 100).toFixed(0)}%`,
    right: `${((1 - frame.value.left - frame.value.width) * 100).toFixed(0)}%`,
    bottom: `${((1 - frame.value.top - frame.value.height) * 100).toFixed(0)}%`
  }
});
</script>

<template>
  <div class="frame" :class="{ 'green-frame': frame?.isSystem, 'modifiable-frame': props.modifiable }" :style="frameRect" ref="frameDiv">
    <div v-if="! frame?.isSystem" class="frame-name">{{ frame?.name }}</div>
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

.frame-name {
  position: absolute;
  top: 0;
  left: 0;
  color: #000000; /* 文字色 */
  font-size: 1.2vh; /* 文字サイズ */
  padding: 2px; /* 余白 */
  background-color: #e1ff00; /* 背景色 */
  border-radius: 4px; /* 角丸 */
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