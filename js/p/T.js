import P from './P'

export default class T {

  constructor (a, b, c) {
    this._p = [a, b, c].sort((a, b) => b.hash - a.hash)
  }

  get print () {
    return this._p.map(p => p.print)
  }

  // t => bool
  eq (t) {
    return this._p[0].eq(t._p[0]) &&
      this._p[1].eq(t._p[1]) &&
      this._p[2].eq(t._p[2])
  }

  // p => bool
  contains (p) {
    let a = p.sign(this._p[0], this._p[1]) === -1
    let b = p.sign(this._p[1], this._p[2]) === -1
    let c = p.sign(this._p[2], this._p[0]) === -1
    return a === b && b === c
  }
}
