<script setup lang="ts">
import { Frames } from '@/states/Frames';
import FrameController from './FrameController.vue';

const addFrame = () => {
    Frames.addFrame({
        name: `Frame ${Frames.frames.length + 1}`,
        left: Math.random() * 0.9,
        top: Math.random() * 0.9,
        width: 0.1,
        height: 0.1
    });
}
</script>

<template>
    <div>
        <button class="btn btn-primary" @click="addFrame">+</button>
        <FrameController v-for="frame in Frames.frames" :key="frame.name" :frame="frame" />
    </div>
</template>