import { reactive } from 'vue'
import { Frames, Frame } from './Frames'

type Props = {
    frame: Frame,
}

export const GreenFrame = reactive<Props>({
    frame: new Frame({...Frames.getDefaultFrame(), ...{name: "Camera"}})
})