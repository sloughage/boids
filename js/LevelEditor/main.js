import State from "./state"
import { move, click, add, unlink, del, polygonate, step, unclick } from "./lvl"
import draw from "./draw"

let state = new State()

function update (state) {
  if (state.lvl.hold) move(state.lvl, state.mouse.p)
  while (state.queue.length) {
    switch (state.queue.shift()) {
      case "mousedown": click(state.lvl, state.mouse.p, state.key.sel); break
      case "mouseup": unclick(state.lvl); break
      case "unlink": unlink(state.lvl); break
      case "delete": del(state.lvl); break
      case "left": step(state.lvl, "left"); break
      case "up": step(state.lvl, "up"); break
      case "right": step(state.lvl, "right"); break
      case "down": step(state.lvl, "down"); break
      case "polygonate": polygonate(state.lvl)
    }
  }
}

function main () {
  update(state)
  draw(state)
  window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)
