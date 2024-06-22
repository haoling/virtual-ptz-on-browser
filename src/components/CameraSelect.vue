<script setup lang="ts">
import { Camera } from '@/states/Camera';
import { ref, onMounted, computed, watch } from 'vue'
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
let devices = ref<MediaDeviceInfo[]>([])
let deviceId = ref<string>(cookies.get('camera_device_id') || '');

onMounted(() => {
  // request camera permission
  startCameraService();
});

const devicesList = computed(() => {
  // devicesの先頭に空白を追加する
  return [{ deviceId: '', label: 'Select Camera' }, ...devices.value];
});

const startCameraService = async () => {
  try {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      stream.getTracks().forEach(track => track.stop());
      navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
        const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
        // devicesを上書き
        devices.value = videoDevices;
        setDeviceId(deviceId.value);
      });
    });
  } catch (error) {
    console.error(error);
    setTimeout(startCameraService, 500);
  }
}

const setDeviceId = (newDeviceId: string) => {
  const camera = devices.value.find(device => device.deviceId === newDeviceId) || null;
  if (camera) {
    cookies.set('camera_device_id', camera.deviceId);
    Camera.set(camera);
  } else {
    cookies.remove('camera_device_id');
    Camera.clear();
  }
}

watch(() => deviceId.value, (newDeviceId) => {
  setDeviceId(newDeviceId);
});
</script>

<template>
  <select class="camera-select" v-model="deviceId">
    <option v-for="device in devicesList" :value="device.deviceId">
      {{ device.label }}
    </option>
  </select>
</template>

<style scoped>
select.camera-select {
  margin-bottom: 10px;
}
</style>
