<script setup lang="ts">
import CameraSelect from './components/CameraSelect.vue';
import PreviewDiv from './components/PreviewDiv.vue';
import { Camera } from './states/Camera';
import ProjectorButton from './components/ProjectorButton.vue';
import { Frames } from './states/Frames';
</script>

<template>
  <div>
    <CameraSelect />
    <ProjectorButton />
    <!-- <div v-for="(frame, index) in frames">
      <frame-controller :frame="frame" :index="index"></frame-controller>
    </div> -->
    <!-- debug-->
    <div style="display: none;">
      {{ Camera.device?.deviceId }}
      {{ Frames.frames.length }}
    </div>
  </div>
  <PreviewDiv />
</template>
