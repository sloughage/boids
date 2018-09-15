import P from "../p/P"

export const canvas = document.getElementById("canvas")

export const ctx = canvas.getContext("2d")

export function drawClear () {
  ctx.clearRect(0, 0, 720, 360)
}

export function drawCircle (p, r, color) {
  ctx.beginPath()
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}

export function drawLine (e, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(e.p.x, e.p.y)
  ctx.lineTo(e.q.x, e.q.y)
  ctx.stroke()
  ctx.closePath()
}

export function drawBox (p, size, fill, edge) {
  ctx.fillStyle = fill
  ctx.fillRect(p.x, p.y, size.x, size.y)
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = edge
  ctx.rect(p.x, p.y, size.x, size.y)
  ctx.stroke()
}

export function drawText (p, txt) {
  ctx.fillStyle = "#fff"
  ctx.font = "small-caps 12px Arial";
  ctx.fillText(txt, p.x, p.y)
}

export function write (txt_list) {
  ctx.fillStyle = '#fff'
  ctx.font = "16px Arial"
  text_list.forEach((txt, i) => {
    ctx.fillText(text, 5, 16 * i)
  })
}

// a, f => [a, a]
export function partition (a, f) {
  let m = [],
      n = []
  a.forEach(k => {
    if (f(k)) m.push(k)
    else n.push(k)
  })
  return [m, n]
}

export function inBox (p, box_p, box_size) {
  return p.x >= box_p.x &&
         p.x <= box_p.x + box_size.x &&
         p.y >= box_p.y &&
         p.y <= box_p.y + box_size.y
}
