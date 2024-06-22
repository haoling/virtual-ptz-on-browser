<script setup lang="ts">
import type { Frame } from '@/states/Frames';

defineProps<{
    frame: Frame;
}>();
</script>

<template>
    <div>{{ frame.name }}</div>
</template>