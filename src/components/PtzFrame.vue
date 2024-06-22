<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import FramePreview from './FramePreview.vue';
import { Frame, Frames, type FrameUpdatableProps } from '@/states/Frames';
import { GREEN_FRAME_ANIMATION_DURATION } from '@/states/Config';
import { GreenFrame } from '@/states/GreenFrame';

const props = defineProps<{
  preViewDiv?: HTMLDivElement,
}>();

const targetFrame = computed(() => {
  return Frames.activeFrame
});

const animate = () => {
  // 緑の枠を黄色い枠に合わせていく処理
  // 緑の枠の位置とサイズを黄色の枠に徐々に合わせる
  // 黄色い枠と緑の枠の位置が同じになっても、緑の枠は表示し続ける
  const greenFrameBackup = GreenFrame.frame.getBackup();
  if (props.preViewDiv && greenFrameBackup) {
    let progress = 1 - (Frames.animationEndTime - Date.now()) / GREEN_FRAME_ANIMATION_DURATION;
    if (progress > 1) {
      progress = 1;
    }

    const left = greenFrameBackup.left + (targetFrame.value.left - greenFrameBackup.left) * progress;
    const top = greenFrameBackup.top + (targetFrame.value.top - greenFrameBackup.top) * progress;
    const right = greenFrameBackup.right + (targetFrame.value.right - greenFrameBackup.right) * progress;
    const bottom = greenFrameBackup.bottom + (targetFrame.value.bottom - greenFrameBackup.bottom) * progress;

    // console.log(left, top, right, bottom)
    GreenFrame.frame.update({left, top, right, bottom})
    // console.log(greenFrame.toStyle())
  }
  requestAnimationFrame(animate);
};

onMounted(() => {
  animate();
});

watch(() => Frames.activeFrame, () => {
  GreenFrame.frame.transaction();
});
</script>

<template>
  <FramePreview :frame="GreenFrame.frame" :isGreen="true" />
</template>

<style scoped>
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
</style>