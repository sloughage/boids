import test from './test'
import P from '../p/P'
import E from '../p/E'
import T from '../p/T'
import G from '../p/G'

let p1 = new P(0, 0)
let p2 = new P(0, 5)
let p3 = new P(5, 5)
let p4 = new P(5, 0)
let p5 = new P(4, 4)
let p6 = new P(1, 1)
let p7 = new P(4, 1)
let p8 = new P(3, 2)

// let g1 = new G(p1, p2, p3)
let g2 = new G(p1, p2, p3, p4)
// let g3 = new G(p1, p2, p6, p3, p4)
let g4 = new G(p5, p6, p7)
let g5 = g2.join(g4)

let g6 = new G( new P(0, 0), new P(10, 0), new P(10, 10), new P(5, 5), new P(0, 10) )
let g7 = new G( new P(1, 1), new P(1, 8), new P(4, 5) )
let g8 = new G( new P(9, 8), new P(6, 5), new P(6, 1), new P(9, 1) )

// test(
//   'G',
//   ['triangulate_1', 1, g1._t.length],
//   ['triangulate_2', 2, g2._t.length],
//   ['triangulate_3', 3, g3._t.length],
//   ['contains_in', true, g2.contains(g4)],
//   ['contains_on', false, g2.contains(g1)],
//   ['contains_out', false, g4.contains(g2)],
//   ['contains_intersect', false, g3.contains(g4)],
  // ['join', 7, g5._t.length],
  // ['join2', 4, g6.join(g7).length],
// )
