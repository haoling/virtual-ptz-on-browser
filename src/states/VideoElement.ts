import { reactive } from 'vue'

type Props = {
    element: HTMLVideoElement | null,
    set: (element: HTMLVideoElement) => void,
}

export const VideoElement = reactive<Props>({
    element: null,
    set(element) {
        this.element = element
    }
})