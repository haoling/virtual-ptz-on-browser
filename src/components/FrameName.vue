<script setup lang="ts">
const props = defineProps<{
  frameName: string
}>();

</script>

<template>
  <div class="frame-name">{{ props.frameName }}</div>
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