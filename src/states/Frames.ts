import { reactive } from "vue"

export interface Frame {
    left: number,
    top: number,
    width: number,
    height: number,
}

type Props = {
    frames: Frame[],
    update: (index: number, newFrame: Frame) => void,
}

export const Frames = reactive<Props>({
    frames: [{left: 0, top: 0, width: 0, height: 0}],
    update(index, newFrame) {
        this.frames[index] = newFrame
    }
})