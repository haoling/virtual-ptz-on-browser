import { reactive } from "vue"
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

interface FrameMembers {
  isSystem: boolean;
  name: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

type SaveMembers = Omit<FrameMembers, "isSystem">

// isSystemとnameはUpdate不可
export type FrameUpdatableProps = Partial<Omit<FrameMembers, "isSystem" | "name">>

export class Frame implements FrameMembers {
  isSystem: boolean;
  name: string;
  left: number;
  top: number;
  right: number;
  bottom: number;

  private backup?: Required<FrameUpdatableProps>;

  constructor({ isSystem, name, left, top, right, bottom }: FrameMembers) {
    this.isSystem = isSystem
    this.name = name
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
  }

  get width() {
    return 1 - this.left - this.right
  }

  get height() {
    return 1 - this.top - this.bottom
  }

  public rename(name: string) {
    this.name = name
    Frames.save()
  }

  public update({ left, top, right, bottom }: FrameUpdatableProps) {
    left !== undefined && (this.left = left)
    top !== undefined && (this.top = top)
    right !== undefined && (this.right = right)
    bottom !== undefined && (this.bottom = bottom)
  }

  public toJSON(): SaveMembers {
    return {
      name: this.name,
      left: this.left,
      top: this.top,
      right: this.right,
      bottom: this.bottom
    }
  }

  public toStyle() {
    return {
      left: `${(this.left * 100).toFixed(0)}%`,
      top: `${(this.top * 100).toFixed(0)}%`,
      right: `${(this.right * 100).toFixed(0)}%`,
      bottom: `${(this.bottom * 100).toFixed(0)}%`,
    }
  }

  public transaction() {
    this.backup = { left: this.left, top: this.top, right: this.right, bottom: this.bottom }
  }

  public getBackup() {
    return this.backup
  }

  public commit() {
    this.backup = undefined
    Frames.save()
  }

  public rollback() {
    if (this.backup) {
      this.left = this.backup.left
      this.top = this.backup.top
      this.right = this.backup.right
      this.bottom = this.backup.bottom
      this.backup = undefined
    }
  }
}

type Props = {
  frames: Frame[]
  modifingFrame?: Frame
  getFrame: (name: string) => Frame | undefined
  addFrame: (args: Omit<FrameMembers, "isSystem">) => void
  tryLoad: () => void
  save: () => void
}

export const Frames = reactive<Props>({
  frames: [new Frame({ isSystem: true, name: "Full", left: 0, top: 0, right: 0, bottom: 0 })],
  getFrame(name) {
    return this.frames.find(frame => frame.name === name)
  },
  addFrame({ name, left, top, right, bottom }) {
    if (this.frames.some(frame => frame.name === name)) return
    this.frames.push(new Frame({ isSystem: false, name, left, top, right, bottom }))
    this.save()
  },
  tryLoad() {
    const frames = cookies.get("frames")
    if (frames) {
      this.frames = this.frames.concat(JSON.parse(frames).map((frame: SaveMembers) => new Frame({isSystem: false, ...frame})))
    }
  },
  save() {
    cookies.set("frames", JSON.stringify(this.frames.filter(frame => ! frame.isSystem).map(frame => frame.toJSON())))
  }
})