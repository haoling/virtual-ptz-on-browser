import { reactive } from 'vue'
import { Frames } from './Frames';

export interface StreamMetadata {
    width: number,
    height: number,
}

type Props = {
    device: MediaDeviceInfo | null,
    streamMetadata: StreamMetadata | null,
    set: (device: MediaDeviceInfo) => void,
    setStreamMetadata: (metadata: StreamMetadata) => void,
}

export const Camera = reactive<Props>({
  device: null,
  streamMetadata: null,
  set(device) {
    this.device = device
  },
  setStreamMetadata(metadata) {
    this.streamMetadata = metadata;
    Frames.update(0, {left: 0, top: 0, width: metadata.width, height: metadata.height})
  }
})