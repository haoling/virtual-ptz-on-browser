import { reactive } from "vue"

type UpdatableProps = {
    left: number;
    top: number;
    width: number;
    height: number;
}
export type Frame = UpdatableProps & {
    isSystem: boolean;
    name: string;
}

type Props = {
    frames: Frame[],
    getFrame: (name: string) => Frame | undefined,
    updateFrame: (args: {name: string} & UpdatableProps) => void,
    addFrame: (args: {name: string} & UpdatableProps) => void,
}

export const Frames = reactive<Props>({
    frames: [{isSystem: true, name: "Full", left: 0, top: 0, width: 1, height: 1}],
    getFrame(name) {
        return this.frames.find(frame => frame.name === name)
    },
    updateFrame({name, left, top, width, height}) {
        const index = this.frames.findIndex(frame => frame.name === name)
        if (index === -1) return
        left !== undefined && (this.frames[index].left = left)
        top !== undefined && (this.frames[index].top = top)
        width !== undefined && (this.frames[index].width = width)
        height !== undefined && (this.frames[index].height = height)
    },
    addFrame({name, left, top, width, height}) {
        if (this.frames.some(frame => frame.name === name)) return
        this.frames.push({isSystem: false, name, left, top, width, height})
    }
})