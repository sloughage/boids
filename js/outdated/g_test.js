import test from './test.js'
import {eq, clockwise, triangulate} from '../p.js'

let p1 = [0, 0]
let p2 = [0, 5]
let p3 = [5, 0]
let p4 = [2, 3]
let p5 = [1, 1]
let p6 = [4, 4]
let p7 = [-2, 1]
let p8 = [4, 3]
let p9 = [5, 5]

let g1 = [p1, p2, p9, p3]
let g2 = [p9, p3, p1, p2]
let g3 = [p2, p1, p3, p9]
let g4 = [p1, p9, p2, p3]
let g5 = [p1, p2, p3]
let g6 = [p1, p2, p5, p4, p3]



test(
  'g_test'
  , [
    'eq_1', true, eq(g1, g1)
  ], [
    'eq_1', true, eq(g1, g2)
  ], [
    'eq_1', true, eq(g1, g3)
  ], [
    'eq_1', false, eq(g1, g4)
  ], [
    'eq_1', false, eq(g1, g5)
  ], [
    'clockwise_g1', true, clockwise(g1)
  ], [
    'clockwise_g2', false, clockwise(g1.slice().reverse())
  ], [
    'clockwise_t1', true, clockwise(g5)
  ], [
    'clockwise_t2', false, clockwise(g5.slice().reverse())
  ], [
    'triangulate_g1', 2, triangulate(g1).length
  ], [
    'triangulate_g5', 1, triangulate(g5).length
  ], [
    'triangulate_g6', 3, triangulate(g6).length
  ]
)
