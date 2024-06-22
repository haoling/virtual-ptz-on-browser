<script setup lang="ts">
import { Frames, type Frame } from '@/states/Frames';
import { computed } from 'vue';

const props = defineProps<{
  frame: Frame;
}>();

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

const modifiable = computed(() => Frames.modifingFrame === props.frame);
</script>

<template>
  <div>{{ frame.name }}</div>
  <div>
    <button class="btn btn-outline-primary p-1 ms-3">Active</button>
    <button v-if="! frame.isSystem" class="btn p-1 ms-5" :class="modifiable ? 'btn-danger' : 'btn-outline-primary'" @click="onBtnModify">Modify</button>
    <button v-if="! frame.isSystem" class="btn btn-outline-primary p-1 ms-1" @click="onBtnRename">Rename</button>
  </div>
</template>