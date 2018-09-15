import P from '../p/P'
import E from '../p/E'
import G from '../p/G'
import { partition } from './util'

function validate (lvl) {
  lvl.p_error = lvl.p_list
    .map(p => lvl.e_list.filter(e => e.includes(p)).length !== 2)
  lvl.e_error = lvl.e_list
    .map(e => lvl.e_list.some(f => !f.shared(e).length && f.intersect(e)))
}

// function polygonate (lvl) {
//   let gs = [],
//       ps = lvl.p_list.slice(),
//       es = lvl.e_list.slice()
//   while (ps.length) {
//     let g = [],
//         p = ps.shift()
//     while (true) {
//       g.push(p)
//       let i = es.findIndex(e => e.includes(p)),
//           e = es[i]
//       es.splice(i, 1)
//       p = e.other(p)
//       i = lvl.p_list.findIndex(q => q.eq(p))
//       if (i === -1) break
//       else lvl.p_list.splice(i, 1)
//     }
//     gs.push(new G(...g))
//   }
//   let g_return = []
//   while (gs.length) {
//     let [g_1, g_out] = partition(gs, g => gs.some(h => h.contains(g)))
//     let [g_2, g_in] = partition(g_1, g => g_1.some(h => h.contains(g)))
//     for (let g of g_in) {
//       for (let i = 0, len = g_out.length; i < len; i++) {
//         if (g_out[i].contains(g)) g_out[i] = g_out[i].join(g)
//       }
//     }
//     gs = g_2
//     g_return = g_return.concat(g_out)
//   }
//   return g_return
// }

export function click (lvl, mouse_p, key) {
  let p = lvl.p_list.find(q => q.d(mouse_p) <= 4)
  if (key === "add" || key === "link") {
    if (!p) {
      p = mouse_p
      lvl.p_list.push(p)
    }
    if (key === "link" && lvl.sel && !p.eq(lvl.sel)) {
      const e = new E(lvl.sel, p)
      if (!lvl.e_list.find(f => f.eq(e))) lvl.e_list.push(e)
    }
  } else if (p && lvl.sel && p.eq(lvl.sel)) {
    lvl.hold = true
  }
  lvl.sel = p || null
  validate(lvl)
}

export function unlink (lvl) {
  if (lvl.sel) {
    lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
    validate(lvl)
  }
}

export function del (lvl) {
  if (lvl.sel) {
    lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
    lvl.p_list.splice(lvl.p_list.findIndex(p => p.eq(lvl.sel)), 1)
    lvl.sel = null
    validate(lvl)
  }
}

function replace (lvl, new_p) {
  lvl.p_list = lvl.p_list.filter(p => !p.eq(lvl.sel))
  lvl.p_list.push(new_p)
  let e_temp = lvl.e_list.filter(e => e.includes(lvl.sel))
  lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
  e_temp.forEach(e => lvl.e_list.push(new E(new_p, e.other(lvl.sel))))
  lvl.sel = new_p
}

export function step (lvl, dir) {
  if (lvl.sel) {
    let new_p = lvl.sel.add(new P(
      dir === "left" ? -1 : dir === "right" ? 1 : 0,
      dir === "up" ? -1 : dir === "down" ? 1 : 0
    ))
    replace(lvl, new_p)
    validate(lvl)
  }
}

export function move (lvl, mouse_p) {
  replace(lvl, mouse_p)
  validate(lvl)
}

export function unclick (lvl) {
  lvl.hold = false
}
