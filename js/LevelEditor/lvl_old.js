import P from '../p/P'
import E from '../p/E'
import G from '../p/G'
import { drawCircle, drawLine, partition } from './util'

const r = 4
let p_list = []
let e_list = []
let p_error = []
let e_error = []
let sel = null
let hold = false

function validate () {
  p_error = p_list
    .map(p => e_list.filter(e => e.includes(p)).length !== 2)
  e_error = e_list
    .map(e => e_list.some(f => !f.shared(e).length && f.intersect(e)))
}

function polygonate () {
  let gs = [],
      ps = p_list.slice(),
      es = e_list.slice()
  while (ps.length) {
    let g = [],
        p = ps.shift()
    while (true) {
      g.push(p)
      let i = es.findIndex(e => e.includes(p)),
          e = es[i]
      es.splice(i, 1)
      p = e.other(p)
      i = p_list.findIndex(q => q.eq(p))
      if (i === -1) break
      else p_list.splice(i, 1)
    }
    gs.push(new G(...g))
  }
  let g_return = []
  while (gs.length) {
    let [g_1, g_out] = partition(gs, g => g_list.some(h => h.contains(g)))
    let [g_2, g_in] = partition(g_1, g => g_temp1.some(h => h.contains(g)))
    for (let g of g_in) {
      for (let i = 0, len = g_out.length; i < len; i++) {
        if (g_out[i].contains(g)) g_out[i] = g_out[i].join(g)
      }
    }
    gs = g_2
    g_return = g_return.concat(g_out)
  }
  return g_return
}

export const lvl = {

  // click: function (mouse_p) {
  //   let p = p_list.find(q => q.d(mouse_p) <= r)
  //   sel = p ? p : null
  // },

  // click: function (mouse_p) {
  //   let p = p_list.find(q => q.d(mouse_p) <= r)
  //   if (p) {
  //     if (sel && sel === p) {
  //       hold = true
  //     } else {
  //       sel = p
  //     }
  //   } else {
  //     sel = null
  //   }
  // },

  click: function (mouse_p) {
    return p_list.find(q => q.d(mouse_p) <= r) || null
  },

  unclick: function () {

  },

  add: function (mouse_p, link=false) {
    let p = p_list.find(q => q.d(mouse_p) <= r)
    if (!p) {
      p = mouse_p
      p_list.push(p)
    }
    if (link && sel && sel !== p) {
      const e = new E(sel, p)
      if (!e_list.find(f => f.eq(e))) e_list.push(e)
    }
    sel = p
    validate()
  },

  unlink: function () {
    if (sel) {
      e_list = e_list.filter(e => !e.includes(sel))
      validate()
    }
  },

  delete: function () {
    if (sel) {
      e_list = e_list.filter(e => !e.includes(sel))
      p_list.splice(p_list.findIndex(p => p.eq(sel)), 1)
      sel = null
      validate()
    }
  },

  draw: function () {
    e_list.forEach((e, i) => {
      drawLine(e, e_error[i] ? "#f00" : "#fff")
    })
    p_list.forEach((p, i) => {
      drawCircle(p, r, p_error[i] ? "#f00" : "#fff")
      if (!sel || !p.eq(sel)) drawCircle(p, r - 1, "#000")
    })
  },

  sel: function () {
    return sel
  },

  move: function (dir) {
    if (sel) {
      let new_p = sel.add(new P(
        dir === "left" ? -1 : dir === "right" ? 1 : 0,
        dir === "up" ? -1 : dir === "down" ? 1 : 0
      ))
      p_list = p_list.filter(p => !p.eq(sel))
      p_list.push(new_p)
      let e_temp = e_list.filter(e => e.includes(sel))
      e_list = e_list.filter(e => !e.includes(sel))
      e_temp.forEach(e => e_list.push(new E(new_p, e.other(sel))))
      sel = new_p
      validate()
    }
  }
}
