<script setup lang="ts">
import CameraSelect from './components/CameraSelect.vue';
import PreviewDiv from './components/PreviewDiv.vue';
import { Camera } from './states/Camera';
import ProjectorButton from './components/ProjectorButton.vue';
import { Frames } from './states/Frames';
import FrameList from './components/FrameList.vue';
import { PreviewResolution } from './states/PreviewResolution';

const DEBUG = false;
</script>

<template>
  <div class="app-container">
    <div class="app-panel p-2">
      <div><CameraSelect /></div>
      <div><ProjectorButton /></div>
      <div><FrameList /></div>
      <!-- debug-->
      <div v-if="DEBUG">
        <div>{{ Camera.device?.deviceId }}</div>
        <div>{{ Camera.device?.label }}</div>
        <div>Preview res: <select v-model="PreviewResolution.resolution"><option>100</option><option>800</option><option>2000</option><option>4000</option></select></div>
        <div>Frames: {{ Frames.frames.length }}</div>
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