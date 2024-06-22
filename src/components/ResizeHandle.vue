<script setup lang="ts">
import { Frame, Frames } from '@/states/Frames';
import { computed } from 'vue';

const props = defineProps<{
  frame: Frame
}>();

const emit = defineEmits({
  resizeFrame(payload: {dx: number, dy: number}) {
    return true;
  }
})

let isResizing: boolean = false;

const startResize = (event: MouseEvent) => {
  // リサイズ処理の開始
  event.preventDefault(); // デフォルトのイベントを防ぐ

  const frame = props.frame;
  frame.transaction();

  isResizing = true; // リサイズ中のフラグを立てる

  // 初期位置を記録
  const startX = event.clientX;
  const startY = event.clientY;

  // マウスが動いたときの処理
  const onMouseMove = (moveEvent:MouseEvent) => {
    if (! isResizing) return;
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;

    // ここでdx, dyを使ってリサイズハンドラの位置を更新する
    // 例: this.position.x += dx; this.position.y += dy;
    // console.log('onMouseMove', dx, dy);

    emit('resizeFrame', {dx: dx, dy: dy});
  };

  // マウスボタンを離したときの処理
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    frame.commit();
    isResizing = false; // リサイズ中のフラグを下ろす
  };

  // ESCキーでリサイズをキャンセル
  document.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Escape') {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      frame.rollback();
      isResizing = false; // リサイズ中のフラグを下ろす
    }
  });

  // イベントリスナーを追加
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <div class="resize-handle" @mousedown="startResize($event)"></div>
</template>

<style scoped>
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ff9100;
  cursor: pointer;
}
</style>
