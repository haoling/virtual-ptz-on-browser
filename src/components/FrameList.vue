<script setup lang="ts">
import { Frames } from '@/states/Frames';
import FrameController from './FrameController.vue';

const addFrame = () => {
    Frames.addFrame({
        name: `Frame ${Frames.frames.length + 1}`,
        left: 0,
        top: 0,
        width: 100,
        height: 100
    });
}
</script>

<template>
    <div>
        <button class="btn btn-primary" @click="addFrame">+</button>
        <FrameController v-for="frame in Frames.frames" :key="frame.name" :frame="frame" />
    </div>
</template>