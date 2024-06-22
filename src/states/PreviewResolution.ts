import { reactive } from 'vue'

type Props = {
    resolution: number,
}

export const PreviewResolution = reactive<Props>({
    resolution: 800
})