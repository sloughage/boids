import test from './test.js'
import {mag, mul, normalize, add, eq, angle, orientation, inbox} from '../p.js'

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

test(
  'p_test',
  ['eq1', true, eq(p0, p1)],
  ['eq2', false, eq(p1, p2)],
  ['mag1', 0, mag(p1)],
  ['mag2', 5, mag(p8)],
  ['mul', true, eq(mul(p5, 4), [4, 4])],
  ['normalize1', true, eq(normalize(p3), [1, 0])],
  ['normalize2', true, eq(normalize(p3, 10), [10, 0])],
  ['add', true, eq(add(p5, p7, p8), [3, 5])],
  ['angle1', Math.round(Math.PI / 2, 4), Math.round(angle(p2, p1, p3), 4)],
  ['angle2', Math.round(Math.PI / 2, 4), Math.round(angle(p2, p9, p3), 4)],
  ['orientation1', -1, orientation(p2, p1, p3)],
  ['orientation2', 1, orientation(p2, p9, p3)],
  ['orientation3', 0, orientation(p1, p5, p6)],
  ['inbox1', true, inbox(p1, p5, p6)],
  ['inbox2', false, inbox(p1, p6, p6)],
  ['inbox3', true, inbox(p1, p4, p6)],
  ['inbox4', false, inbox(p1, p6, p5)],
)
