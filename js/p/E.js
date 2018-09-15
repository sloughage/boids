import P from './P'

export default class E {

  constructor (p, q) {
    this._p = p.hash < q.hash ? [p, q] : [q, p]
  }

  get print () {
    return this._p.map(p => p.print)
  }

  get p () {
    return this._p[0]
  }

  get q () {
    return this._p[1]
  }

  // e => bool
  eq (e) {
    return this._p.every((p, i) => e._p[i].eq(p))
  }

  // p => bool
  includes (p) {
    return this._p.some(q => p.eq(q))
  }

  // e => [p]
  shared (e) {
    return this._p.filter(p => e.includes(p))
  }

  // e => bool
  intersect (e) {
    function inbox (p, v, q) {
      return (
        (p.x > v.x || q.x > v.x) &&
        (p.x < v.x || q.x < v.x) &&
        (p.y > v.y || q.y > v.y) &&
        (p.y < v.y || q.y < v.y)
      )
    }
    let [a, b, c, d] = [...this._p, ...e._p]
    let o1 = b.sign(a, c)
    let o2 = b.sign(a, d)
    let o3 = d.sign(c, a)
    let o4 = d.sign(c, b)
    return this.eq(e) ||
      (o1 !== o2 && o3 !== o4) ||
      (o1 === 0 && inbox(a, c, b)) ||
      (o2 === 0 && inbox(a, d, b)) ||
      (o3 === 0 && inbox(c, a, d)) ||
      (o4 === 0 && inbox(c, b, d))
  }

  // p => p
  other (p) {
    return p.eq(this._p[0]) ? this._p[1] : this._p[0]
  }

}
