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
    update: (args: {index: number} & UpdatableProps) => void,
}

export const Frames = reactive<Props>({
    frames: [{isSystem: true, name: "Full", left: 0, top: 0, width: 0, height: 0}],
    getFrame(name) {
        return this.frames.find(frame => frame.name === name)
    },
    update({index, left, top, width, height}) {
        left !== undefined && (this.frames[index].left = left)
        top !== undefined && (this.frames[index].top = top)
        width !== undefined && (this.frames[index].width = width)
        height !== undefined && (this.frames[index].height = height)
    }
})