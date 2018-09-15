import test from './test.js'
import {contains, eq, shared, intersect} from '../p.js'

let p1 = [0, 0]
let p2 = [0, 5]
let p3 = [5, 0]
let p4 = [2, 3]
let p5 = [1, 1]
let p6 = [4, 4]
let p7 = [-2, 1]
let p8 = [3, 4]
let p9 = [5, 5]

let e1 = [p1, p2]
let e2 = [p1, p3]
let e3 = [p2, p1]
let e4 = [p3, p4]
let e5 = [p2, p5]
let e6 = [p1, p6]
let e7 = [p2, p3]
let e8 = [p5, p9]
let e9 = [p1, p5]
let e10 = [p6, p9]
let e11 = [p5, p6]
let e12 = [p4, p8]
let e13 = [p2, p4]


test(
  'e_test',
  ['contains1', true, contains(e1, p1)],
  ['contains2', false, contains(e1, p3)],
  ['eq1', true, eq(e1, e1)],
  ['eq2', true, eq(e1, e3)],
  ['eq3', false, eq(e1, e2)],
  ['shared_1', 1, shared(e1, e2).length],
  ['shared_none', 0, shared(e1, e4).length],
  ['intersect_same', true, intersect(e1, e3)],
  ['intersect_sharedp', true, intersect(e1, e2)],
  ['intersect_online', true, intersect(e1, e5)],
  ['intersect_cross', true, intersect(e6, e7)],
  ['intersect_colinear1', true, intersect(e6, e8)],
  ['intersect_colinear2', false, intersect(e9, e10)],
  ['intersect_parallel', false, intersect(e11, e12)],
  ['intersect_none', false, intersect(e11, e13)],
)
