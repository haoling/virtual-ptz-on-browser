<script setup lang="ts">
import { Frames } from '@/states/Frames';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  frameName: string
}>();

const frame = computed(() => Frames.getFrame(props.frameName));
const frameDiv = ref<HTMLDivElement | null>(null);
const frameRect = computed(() => {
    if (! frame.value) {
        return {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
    }

    return {
        left: `${(frame.value.left * 100).toFixed(0)}%`,
        top: `${(frame.value.top * 100).toFixed(0)}%`,
        right: `${((1 - frame.value.left - frame.value.width) * 100).toFixed(0)}%`,
        bottom: `${((1 - frame.value.top - frame.value.height) * 100).toFixed(0)}%`
    }
});
</script>

<template>
  <div class="frame" :class="{greenframe: frame?.isSystem}" :style="frameRect" ref="frameDiv"></div>
</template>

<style scoped>
.frame {
  border: 2px solid yellow;
  position: absolute;
}

.greenframe {
  border-color: green;
}
</style>