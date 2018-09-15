import test from './test'
import P from '../p/P'
import T from '../p/T'

let p1 = new P(0, 0)
let p2 = new P(0, 5)
let p3 = new P(5, 5)
let p4 = new P(5, 0)
let p5 = new P(4, 4)
let p6 = new P(1, 1)

let t0 = new T(p1, p2, p3)
let t1 = new T(p3, p2, p1)
let t2 = new T(p1, p2, p4)

test(
  'T',
  ['eq_1', true, t0.eq(t1)],
  ['eq_2', false, t1.eq(t2)],
  ['contains_in', true, t2.contains(p6)],
  ['contains_on', true, t1.contains(p6)],
  ['contains_point', true, t1.contains(p1)],
  ['contains_out', false, t1.contains(p4)],
)
