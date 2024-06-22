<script setup lang="ts">
import { Frames } from '@/states/Frames';
import FrameController from './FrameController.vue';

</script>

<template>
    <div>
        <FrameController v-for="frame in Frames.frames" :key="frame.name" :frame="frame" />
    </div>
</template>