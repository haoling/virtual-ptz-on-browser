<script setup lang="ts">
import CameraSelect from './components/CameraSelect.vue';
import PreviewDiv from './components/PreviewDiv.vue';
import { Camera } from './states/Camera';
import ProjectorButton from './components/ProjectorButton.vue';
import { Frames } from './states/Frames';
</script>

<template>
  <div class="app-container">
    <div class="app-panel p-2">
      <div><CameraSelect /></div>
      <div><ProjectorButton /></div>
      <!-- <div v-for="(frame, index) in frames">
        <frame-controller :frame="frame" :index="index"></frame-controller>
      </div> -->
      <!-- debug-->
      <div style="display: none;">
        {{ Camera.device?.deviceId }}
        {{ Frames.frames.length }}
      </div>
    </div>
    <PreviewDiv class="preview-container" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.app-panel {
  flex-basis: 25%;
}

.preview-container {
  flex-grow: 3;
  height: 100%;
}
</style>