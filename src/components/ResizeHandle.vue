<script setup lang="ts">

const emit = defineEmits({
  resizeFrame(payload: {dx: number, dy: number}) {
    return true;
  }
})

let isResizing: boolean = false;

const startResize = (event: MouseEvent) => {
  // リサイズ処理の開始
  event.preventDefault(); // デフォルトのイベントを防ぐ
  isResizing = true; // リサイズ中のフラグを立てる

  // 初期位置を記録
  let lastX = event.clientX;
  let lastY = event.clientY;

  // マウスが動いたときの処理
  const onMouseMove = (moveEvent:MouseEvent) => {
    if (! isResizing) return;
    const dx = moveEvent.clientX - lastX;
    const dy = moveEvent.clientY - lastY;

    // ここでdx, dyを使ってリサイズハンドラの位置を更新する
    // 例: this.position.x += dx; this.position.y += dy;
    // console.log('onMouseMove', dx, dy);

    emit('resizeFrame', {dx: dx, dy: dy});

    lastX = moveEvent.clientX;
    lastY = moveEvent.clientY;
  };

  // マウスボタンを離したときの処理
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    isResizing = false; // リサイズ中のフラグを下ろす
  };

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
