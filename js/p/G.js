import P from './P'
import E from './E'
import T from './T'

// [p] => bool
function clockwise (c) {
  let sum = 0
  for ( let len = c.length, i = 0; i < len; i++) {
    let p = c[i],
        q = c[(i + 1) % len]
    sum += (p.x * q.y) - (q.x * p.y)
    // sum += (q.x - p.x) * (q.y + p.y)
  }
  return sum > 0
}

// [p] => [e]
function edges (c) {
  let len = c.length
  return c.map((p, i) => new E(p, c[(i + 1) % len]))
}

// [p] => [t]
function triangulate (c) {
  let t_list = [],
      e_list = edges(c),
      len = c.length,
      i = 0
  while (len > 3) {
    let p = c[(i - 1 + len) % len],
        v = c[i],
        q = c[(i + 1) % len],
        f = new E(p, q),
        c2 = c.slice(0, i).concat(c.slice(i + 1))
    if (
      clockwise([p, v, q]) &&
      clockwise(c2) &&
      !e_list.filter(e => e.intersect(f) && !e.includes(p) && !e.includes(q)).length
    ) {
      t_list.push(new T(p, v, q))
      c = c2
      len--
    }
    i = (i + 1) % len
  }
  t_list.push(new T(...c))
  return t_list
}

export default class G {

  constructor (...p) {
    if (!clockwise(p)) p.reverse()
    this._p = p
    this._e = edges(p)
    this._t = triangulate(p)
  }

  get length () {
    return this._p.length
  }

  // g => bool
  contains (g) {
    let e_out = edges(this._p),
        e_in = edges(g._p)
    for (let e of e_out) {
      for (let f of e_in) {
        if (e.intersect(f)) return false
      }
    }
    return g._p.every(p => this._t.some(t => t.contains(p)))
  }

  // g => g

  // join (g) {
  //   let min_i,
  //       min_j,
  //       min_d = Infinity,
  //       l_out = this._p.length,
  //       l_in = g._p.length,
  //       e_out = edges(this._p),
  //       e_in = edges(g._p)
  //   for (let i = 0; i < l_out; i++) {
  //     for (let j = 0; j < l_in; j++) {
  //       let p = this._p[i],
  //           q = g._p[j],
  //           d = p.d(q),
  //           f = new E(p, q)
  //       if (
  //         d < min_d &&
  //         e_out.filter(e => e.intersect(f)).length === 2 &&
  //         e_in.filter(e => e.intersect(f)).length === 2
  //       ) {
  //         min_i = i
  //         min_j = j
  //         min_d = d
  //       }
  //     }
  //   }
  //   return new G(
  //     ...this._p.slice(0, min_i + 1),
  //     ...g._p.slice(0, min_j + 1).reverse(),
  //     ...g._p.slice(min_j).reverse(),
  //     this._p[min_i]
  //   )
  // }

  join (g) {
    let e_list = edges(this._p).concat(edges(g._p))
    for (let i = 0; i < this._p.length; i++) {
      for (let j = 0; j < g._p.length; j++) {
        let e = new E(this._p[i], g._p[j])
        if (e_list.filter(f => f.intersect(e)).length === 4) {
          return new G(
            ...this._p.slice(0, i + 1),
            ...g._p.slice(0, j + 1).reverse(),
            ...g._p.slice(j).reverse(),
            ...this._p.slice(i)
          )
        }
      }
    }
  }

  print () {
    let p = uniq(this._p).map(p => p.print)
    let e = uniq(this._e).map(e => e.print)
    let t = this._t.map(t => t.print)
    return {p, e, t}
  }

}
