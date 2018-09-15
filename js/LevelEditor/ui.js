import P from "../p/P"
import { drawButton, drawBox, drawText, inBox } from "./util"

const buttons = [
  {id: "add", txt: "1 Add"},
  {id: "link", txt: "2 Link"},
  {id: "unlink", txt: "3 Unlink"},
  {id: "delete", txt: "4 Delete"}
]

export const ui = {

  click: function (mouse_p) {
    return buttons.find(b => inBox(mouse_p, b.p, b.size)).id
  },

  draw: function (key, mouse, sel) {
    buttons.forEach((b, i) => {
      const p = new P(659, 27 * i + 10)
      drawBox(p, new P(51, 20), key[b.id] ? "#444" : "#000", "#fff")
      if (b.id === key.sel) drawBox(p.add(new P(48, 0)), new P(3, 20), "#fff", "#fff")
      drawText(p.add(new P(3, 14)), b.txt)
    })
    const p = new P(659, 314)
    drawBox(p, new P(51, 36), "#000", "#fff")
    drawText(p.add(new P(3, 14)), mouse.p.toString())
    drawText(p.add(new P(3, 30)), sel ? sel.toString() : "--")
  }
}
