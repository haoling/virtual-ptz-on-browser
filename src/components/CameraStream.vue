<script setup lang="ts">
import { Camera } from '@/states/Camera';
import { VideoElement } from '@/states/VideoElement';
import { ref, watch } from 'vue'

const videoElement = ref<HTMLVideoElement>();
const currentStream = ref<MediaStream | null>(null);

watch(() => videoElement.value, (video) => {
  if (video) {
    VideoElement.set(video);
  }
});

watch(() => Camera.device, (camera) => {
  if (camera && videoElement.value) {
    const video = videoElement.value;
    if (currentStream.value) {
      currentStream.value.getTracks().forEach(track => track.stop());
    }
    const constraints = {
      video: {
        deviceId: camera.deviceId,
        width: { min: 1920, ideal: 3840 },
        height: { min: 1080, ideal: 2160 },
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      currentStream.value = stream;
      video.srcObject = stream;
      video.play();
    });
  } else {
    if (currentStream.value) {
      currentStream.value.getTracks().forEach(track => track.stop());
    }
    currentStream.value = null;
    if (videoElement.value) {
      videoElement.value.srcObject = null;
    }
  }
});

const onLoadedMetadata = () => {
  if (videoElement.value) {
    Camera.setStreamMetadata({
      width: videoElement.value.videoWidth,
      height: videoElement.value.videoHeight,
    });
  }
}
</script>

<template>
  <video ref="videoElement" class="preview-video" autoplay style="display:none;" @loadedmetadata="onLoadedMetadata"></video>
</template>

<style scoped>
.preview-video {
  width: 100%;
  height: 100%;
}
</style>