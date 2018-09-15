import test from './test.js'
import {contains, eq, shared, inside} from '../p.js'

let p0 = [0, 0]
let p1 = [0, 0]
let p2 = [0, 5]
let p3 = [5, 0]
let p4 = [2, 3]
let p5 = [1, 1]
let p6 = [4, 4]
let p7 = [-2, 1]
let p8 = [4, 3]
let p9 = [5, 5]

let t0 = [p3, p2, p1]
let t1 = [p1, p2, p3]
let t2 = [p2, p3, p9]
let t3 = [p3, p5, p9]
let t4 = [p4, p5, p9]

test(
  't_test',
  ['contains1', true, contains(t1, p0)],
  ['contains2', false, contains(t1, p6)],
  ['eq1', true, eq(t1, t0)],
  ['eq2', false, eq(t1, t2)],
  ['shared_2', 2, shared(t1, t2).length],
  ['shared_none', 0, shared(t1, t4).length],
  ['inside1', true, inside(t1, p5)],
  ['inside2', true, inside(t1, p2)],
  ['inside3', true, inside(t1, p4)],
  ['inside4', false, inside(t1, p6)],

)
