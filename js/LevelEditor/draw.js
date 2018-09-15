import P from "../p/P"
import { drawClear, drawLine, drawCircle, drawBox, drawText } from './util'

function lvl (lvl) {
  lvl.e_list.forEach((e, i) => {
    drawLine(e, lvl.e_error[i] ? "#f00" : "#fff")
  })
  lvl.p_list.forEach((p, i) => {
    drawCircle(p, 4, lvl.p_error[i] ? "#f00" : "#fff")
    if (!lvl.sel || !p.eq(lvl.sel)) drawCircle(p, 4 - 1, "#000")
  })
}

const buttons = [
  {id: "add", txt: "1 Add"},
  {id: "link", txt: "2 Link"},
  {id: "unlink", txt: "3 Unlink"},
  {id: "delete", txt: "4 Delete"}
]

function ui (key, mouse_p, sel) {
  buttons.forEach((b, i) => {
    const p = new P(659, 27 * i + 10)
    drawBox(p, new P(51, 20), key[b.id] ? "#444" : "#000", "#fff")
    if (b.id === key.sel) drawBox(p.add(new P(48, 0)), new P(3, 20), "#fff", "#fff")
    drawText(p.add(new P(3, 14)), b.txt)
  })
  const p = new P(659, 314)
  drawBox(p, new P(51, 36), "#000", "#fff")
  drawText(p.add(new P(3, 14)), mouse_p.toString())
  drawText(p.add(new P(3, 30)), sel ? sel.toString() : "--")
}

export default function draw (state) {
  drawClear()
  lvl(state.lvl)
  ui(state.key, state.mouse.p, state.lvl.sel)
}
