import P from "../p/P"
import { canvas } from "./util"

export default class {
  constructor () {
    this.key = {
      sel: null,
      add: false,
      link: false,
      unlink: false,
      delete: false,
      left: false,
      up: false,
      right: false,
      down: false,
      shift: false
    }
    this.mouse = {
      p: new P(0, 0),
      sp: new P(0, 0),
      down: false
    }
    this.lvl = {
      p_list: [],
      e_list: [],
      p_error: [],
      e_error: [],
      sel: null,
      hold: null
    }
    this.canvas = getDimensions()
    this.queue = []

    canvas.addEventListener("mousedown", e => {
      this.mouse.sp = this.mouse.p
      this.mouse.down = true
      this.queue.push("mousedown")
    })

    document.addEventListener("mouseup", e => {
      this.mouse.down = false
      this.queue.push("mouseup")
    })

    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 49:
          this.key.sel = (this.key.sel === "add") ^ this.key.add ? null : "add"
          this.key.add = true
          break
        case 50:
          this.key.sel = (this.key.sel === "link") ^ this.key.link ? null : "link"
          this.key.link = true
          break
        case 51:
          if (!this.key.unlink) this.queue.push("unlink")
          this.key.unlink = true
          this.key.sel = null
          break
        case 52:
          if (!this.key.delete) this.queue.push("delete")
          this.key.delete = true
          this.key.sel = null
        case 37:
          this.queue.push("left")
          this.key.left = true
          break
        case 38:
          this.queue.push("up")
          this.key.up = true
          break
        case 39:
          this.queue.push("right")
          this.key.right = true
          break
        case 40:
          this.queue.push("down")
          this.key.down = true
          break
        case 16:
          this.key.shift = true
      }
    })

    document.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case 49: this.key.add = false; break
        case 50: this.key.link = false; break
        case 51: this.key.unlink = false; break
        case 52: this.key.delete = false; break
        case 37: this.key.left = false; break
        case 38: this.key.up = false; break
        case 39: this.key.right = false; break
        case 40: this.key.down = false; break
        case 16: this.key.shift = false
      }
    })

    document.addEventListener("mousemove", e => {
      let middle = (a, b, c) => Math.min(Math.max(a, b), c)
      this.mouse.p = new P(
        middle(0, e.clientX - this.canvas.left, this.canvas.width),
        middle(0, e.clientY - this.canvas.top, this.canvas.height)
      )
    })
  }
}

// window.addEventListener("onresize", onresize)

function getDimensions () {
  const rect = canvas.getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }
}
