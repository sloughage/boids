import test from './test'
import P from '../p/P'
import {round} from '../p/util'

let p0 = new P(0, 0)
let p1 = new P(0, 0)
let p2 = new P(0, 5)
let p3 = new P(5, 5)
let p4 = new P(5, 0)
let p5 = new P(4, 3)
let p6 = new P(1, 1)

test(
  'P',
  ['eq_1', true, p0.eq(p1)],
  ['eq_2', false, p1.eq(p2)],
  ['mag_1', 0, p1.mag],
  ['mag_2', 5, p2.mag],
  ['mag_3', 5, p5.mag],
  ['mul_1', true, p5.mul(0).eq(p1)],
  ['mul_2', true, p6.mul(5).eq(p3)],
  ['normalize_1', true, p1.normalize().eq(p1)],
  ['normalize_2', true, p2.normalize().eq(new P(0, 1))],
  ['normalize_3', true, p5.normalize(10).eq(new P(8, 6))],
  ['add', true, p6.add(p6, p6, p6, p6).eq(p3)],
  // ['angle_1', round(Math.PI / 2, 4), round(p1.angle(p2, p3), 4)],
  // ['angle_2', round(Math.PI / 2, 4), round(p3.angle(p2, p3), 4)],
  ['sign_-1', -1, p1.sign(p2, p3)],
  ['sign_1', 1, p1.sign(p3, p2)],
  ['sign_0', 0, p6.sign(p1, p3)],
  // ['inbox1', true, inbox(p1, p5, p6)],
  // ['inbox2', false, inbox(p1, p6, p6)],
  // ['inbox3', true, inbox(p1, p4, p6)],
  // ['inbox4', false, inbox(p1, p6, p5)],
  ['hash_1', true, p1.hash === p0.hash],
  ['hash_2', false, p1.hash === p2.hash],
)
