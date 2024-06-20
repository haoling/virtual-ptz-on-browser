<script setup lang="ts">
import CameraSelect from './components/CameraSelect.vue';
import HelloWorld from './components/HelloWorld.vue'

let cameraId:MediaDeviceInfo | null = null;
</script>

<template>
  <div>
    <CameraSelect v-model="cameraId" />
    <button id="projectorButton">プロジェクター画面を開く</button>
    <!-- <div v-for="(frame, index) in frames">
      <frame-controller :frame="frame" :index="index"></frame-controller>
    </div> -->
  </div>
  <div id="preview">
    <video id="videoElement" autoplay style="display:none;"></video>
    <canvas id="canvas1" width="800" height="600"></canvas>
    <div id="yellowFrame" class="frame"></div>
    <div id="greenFrame" class="frame green-frame"></div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
