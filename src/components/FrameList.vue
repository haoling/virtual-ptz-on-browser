<script setup lang="ts">
import { Frames } from '@/states/Frames';
import FrameController from './FrameController.vue';

const addFrame = () => {
    const left = Math.random() * 0.9;
    const top = Math.random() * 0.9;
    Frames.addFrame({
        name: `Frame ${Frames.frames.length + 1}`,
        left: left,
        top: top,
        right: 1 - left - 0.1,
        bottom: 1 - top - 0.1,
    });
}
</script>

<template>
    <div class="mt-2">
        <button class="btn btn-primary" @click="addFrame">+</button>
        <FrameController v-for="frame in Frames.frames" :key="frame.name" :frame="frame" />
    </div>
</template>