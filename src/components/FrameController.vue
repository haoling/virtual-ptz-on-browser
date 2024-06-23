<script setup lang="ts">
import { Frames, type Frame } from '@/states/Frames';
import { computed, ref, watch } from 'vue';
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
  deleteConfirm.value = false;
  if (Frames.modifingFrame === props.frame) {
    Frames.modifingFrame = undefined;
  } else {
    Frames.modifingFrame = props.frame;
  }
};

const onDelete = () => {
  Frames.deleteFrame(props.frame.name);
};

const deleteConfirm = ref(false);
const activated = computed(() => Frames.activeFrame === props.frame);
const modifiable = computed(() => Frames.modifingFrame === props.frame);

watch(() => Frames.activeFrame, () => {
  deleteConfirm.value = false;
});
</script>

<template>
  <div>{{ frame.name }}</div>
  <div>
    <button class="btn p-1 ms-2 me-4 small-text" :class="activated ? 'btn-warning' : 'btn-outline-primary'" @click="onBtnActive">Active</button>
    <button v-if="! frame.isSystem" class="btn p-1 ms-1 small-text" :class="modifiable ? 'btn-warning' : 'btn-outline-primary'" @click="onBtnModify">Modify</button>
    <button v-if="! frame.isSystem && ! modifiable" class="btn btn-outline-primary p-1 ms-1 small-text" :disabled="Frames.modifingFrame !== undefined" @click="onBtnRename">Rename</button>
    <button v-if="! frame.isSystem && modifiable" class="btn btn-outline-danger p-1 mx-2 small-text" :disabled="activated" @click="deleteConfirm = ! deleteConfirm">Delete</button>
    <ProjectorButton :frame="frame" text="View" class="p-1 ms-1 small-text" />

    <div v-if="deleteConfirm" class="card border-danger w-75 mt-1 mb-3">
      <div class="card-header">Confirm delete?</div>
      <div class="card-body text-danger">
        <p class="card-text">This action cannot be undone.</p>
        <button class="btn btn-danger" @click="onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small-text {
  font-size: 1.5vh;
}
</style>