import { reactive } from 'vue'
import { Frames } from './Frames';

export interface StreamMetadata {
    width: number,
    height: number,
}

type Props = {
    device: MediaDeviceInfo | null,
    streamMetadata: StreamMetadata | null,
    clear: () => void,
    set: (device: MediaDeviceInfo) => void,
    setStreamMetadata: (metadata: StreamMetadata) => void,
}

export const Camera = reactive<Props>({
  device: null,
  streamMetadata: null,
  clear() {
    this.device = null
    this.streamMetadata = null
  },
  set(device) {
    this.device = device
  },
  setStreamMetadata(metadata) {
    this.streamMetadata = metadata;
  }
})