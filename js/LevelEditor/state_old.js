import P from "../p/P"
import { canvas } from "./util"

export const state = {
  key: {
    add: false,
    link: false,
    unlink: false,
    delete: false,
    sel: null,
    left: false,
    up: false,
    right: false,
    down: false
  },
  mouse: {
    p: new P(0, 0),
    sp: new P(0, 0),
    down: false,
  },
  sel: null,
  hold: false,
  canvas: getDimensions(),
  queue: []
}

canvas.addEventListener("mousedown", e => {
  state.mouse.sp = state.mouse.p
  state.mouse.down = true
  state.queue.push("mousedown")
})

document.addEventListener("mouseup", e => {
  state.mouse.down = false
  state.queue.push("mouseup")
})

document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 49:
      state.key.sel = (state.key.sel === "add") ^ state.key.add ? null : "add"
      state.key.add = true
      break
    case 50:
      state.key.sel = (state.key.sel === "link") ^ state.key.link ? null : "link"
      state.key.link = true
      break
    case 51:
      if (!state.key.unlink) state.queue.push("unlink")
      state.key.unlink = true
      state.key.sel = null
      break
    case 52:
      if (!state.key.delete) state.queue.push("delete")
      state.key.delete = true
      state.key.sel = null
    case 37:
      if (!state.key.left) state.queue.push("left")
      state.key.left = true
      break
    case 38:
    if (!state.key.up) state.queue.push("up")
      state.key.up = true
      break
    case 39:
    if (!state.key.right) state.queue.push("right")
      state.key.right = true
      break
    case 40:
      if (!state.key.down) state.queue.push("down")
      state.key.down = true
  }
})

document.addEventListener("keyup", e => {
  switch (e.keyCode) {
    case 49:
      state.key.add = false
      break
    case 50:
      state.key.link = false
      break
    case 51:
      state.key.unlink = false
      break
    case 52:
      state.key.delete = false
      break
    case 37:
      state.key.left = false
      break
    case 38:
      state.key.up = false
      break
    case 39:
      state.key.right = false
      break
    case 40:
      state.key.down = false
  }
})

document.addEventListener("mousemove", e => {
  function between (a, b, c) {return Math.min(Math.max(a, b), c)}
  state.mouse.p = new P(
    between(0, e.clientX - state.canvas.left, state.canvas.width),
    between(0, e.clientY - state.canvas.top, state.canvas.height)
  )
})

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
