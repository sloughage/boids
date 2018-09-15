import test from './test'
import P from '../p/P'
import E from '../p/E'

let p1 = new P(0, 0)
let p2 = new P(0, 5)
let p3 = new P(5, 5)
let p4 = new P(5, 0)
let p5 = new P(4, 4)
let p6 = new P(1, 1)

let e0 = new E(p2, p1)
let e1 = new E(p1, p2)
let e2 = new E(p1, p3)
let e3 = new E(p3, p4)
let e4 = new E(p4, p6)
let e5 = new E(p2, p4)
let e6 = new E(p1, p5)
let e7 = new E(p3, p6)
let e8 = new E(p1, p6)
let e9 = new E(p3, p5)
let e10 = new E(new P(0, 1), new P(5, 6))


test(
  'E',
  ['includes_1', true, e1.includes(p1)],
  ['includes_2', false, e1.includes(p3)],
  ['eq1', true, e1.eq(e1)],
  ['eq2', true, e1.eq(e0)],
  ['eq3', false, e1.eq(e2)],
  ['shared_2', 2, e1.shared(e0).length],
  ['shared_1', 1, e1.shared(e2).length],
  ['shared_none', 0, e1.shared(e3).length],
  ['intersect_same', true, e1.intersect(e1)],
  ['intersect_shared', true, e1.intersect(e2)],
  ['intersect_online', true, e2.intersect(e4)],
  ['intersect_cross', true, e2.intersect(e5)],
  ['intersect_colinear_1', true, e6.intersect(e7)],
  ['intersect_colinear_2', false, e8.intersect(e9)],
  ['intersect_parallel', false, e2.intersect(e10)],
  ['intersect_none', false, e4.intersect(e10)],
)
