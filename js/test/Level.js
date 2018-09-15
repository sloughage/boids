import test from './test'
import P from '../p/P'
import E from '../p/E'
import T from '../p/T'
import G from '../p/G'
import Level from '../LevelEditor/Level'

let p1 = new P(0, 0)
let p2 = new P(0, 5)
let p3 = new P(5, 5)
let p4 = new P(5, 0)
let p5 = new P(4, 4)
let p6 = new P(1, 1)
let p7 = new P(4, 1)
let p8 = new P(3, 2)

let lvl = new Level(null)

lvl.add(p1)
lvl.add(p3)
lvl.add(p2)

lvl.sel = p3
lvl.add(p4, true) //34
lvl.sel =p2
lvl.add(p1, true) //21
lvl.add(p3, true) //23
lvl.sel = p4
lvl.add(p1, true) //41

test(
  'Level',
  ['add_p', 4, lvl._p.length],
  ['add_e', 4, lvl._e.length],
  ['polygonate', 1, lvl.polygonate().length],
  // ['triangulate_2', 2, g2._t.length],
)
