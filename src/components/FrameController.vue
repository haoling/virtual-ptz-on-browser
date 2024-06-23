<script setup lang="ts">
import { Frames, type Frame } from '@/states/Frames';
import { computed } from 'vue';
import ProjectorButton from './ProjectorButton.vue';

const props = defineProps<{
  frame: Frame;
}>();

const onBtnActive = () => {
  Frames.setActiveFrame(props.frame);
};

const onBtnRename = () => {
  // promptを表示して名前を入力させる
  const newName = prompt('Enter new name', props.frame.name);
  if (!newName) return;
  props.frame.rename(newName);
};

const onBtnModify = () => {
  if (Frames.modifingFrame === props.frame) {
    Frames.modifingFrame = undefined;
  } else {
    Frames.modifingFrame = props.frame;
  }
};

const activated = computed(() => Frames.activeFrame === props.frame);
const modifiable = computed(() => Frames.modifingFrame === props.frame);
</script>

<template>
  <div>{{ frame.name }}</div>
  <div>
    <button class="btn p-1 ms-2 me-4 small-text" :class="activated ? 'btn-danger' : 'btn-outline-primary'" @click="onBtnActive">Active</button>
    <button v-if="! frame.isSystem" class="btn p-1 ms-1 small-text" :class="modifiable ? 'btn-danger' : 'btn-outline-primary'" @click="onBtnModify">Modify</button>
    <button v-if="! frame.isSystem" class="btn btn-outline-primary p-1 ms-1 small-text" @click="onBtnRename">Rename</button>
    <ProjectorButton :frame="frame" text="View" btn-class="btn-outline-primary" class="p-1 ms-1 small-text" />
  </div>
</template>

<style scoped>
.small-text {
  font-size: 1.5vh;
}
</style>