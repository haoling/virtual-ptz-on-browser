<script setup lang="ts">
import { Camera } from '@/states/Camera';
import { ref, onMounted } from 'vue'
let devices = ref<MediaDeviceInfo[]>([])
let deviceId = ref<string | null>(null)

onMounted(() => {
  // request camera permission
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    stream.getTracks().forEach(track => track.stop());
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
      // devicesを上書き
      devices.value = videoDevices;
    });
  });
});

const onchange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const camera = devices.value.find(device => device.deviceId === target.value) || null;
  if (camera) {
    Camera.set(camera);
  }
}
</script>

<template>
  <select class="camera-select" v-model="deviceId" @change="onchange">
    <option v-for="device in devices" :value="device.deviceId">
      {{ device.label }}
    </option>
  </select>
</template>

<style scoped>
select.camera-select {
  margin-bottom: 10px;
}
</style>
