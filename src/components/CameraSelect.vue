<script setup lang="ts">
import { ref, onMounted } from 'vue'
const model = defineModel<MediaDeviceInfo | null>()

let devices = ref<MediaDeviceInfo[]>([])
let deviceId = ref<string | null>(null)

onMounted(() => {
  // request camera permission
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    stream.getTracks().forEach(track => track.stop());
  });

  navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
    const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
    // devicesを上書き
    devices.value = videoDevices;
  });
});

const onchange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  model.value = devices.value.find(device => device.deviceId === target.value) || null;
  console.log(model.value);
}
</script>

<template>
  <select v-model="deviceId" @change="onchange">
    <option v-for="device in devices" :value="device.deviceId">
      {{ device.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  margin-bottom: 10px;
}
</style>
