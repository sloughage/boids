import {diagonal, round} from './util'

export default class P {

  constructor (x, y) {
    this._x = round(x, 3)
    this._y = round(y, 3)
  }

  get print () {
    return [this._x, this._y]
  }

  get x () {
    return this._x
  }

  get y () {
    return this._y
  }

  // => i
  get hash () {
    let x = this._x * 1000
    let y = this._y * 1000
    return ((x + y) * (x + y + 1) / 2) + y
  }

  // => n
  get mag () {
    return diagonal(this._x, this._y)
  }

  // p => n
  d (p) {
    return diagonal(this._x - p._x, this._y - p._y)
  }

  // => p
  copy () {
    return new P(this._x, this._y)
  }

  // p => bool
  eq (p) {
    return this._x === p._x && this._y === p._y
  }

  // n => p
  mul (n) {
    return new P(this._x * n, this._y * n)
  }

  // n => p
  normalize (n=1) {
    let k = this.mag
    if (!k) return this.copy()
    return this.mul(n / k)
  }

  // ...p => p
  add (...p) {
    return p.reduce((a, b) => new P(a._x + b._x, a._y + b._y), this)
  }

  // p, q => rad
  angle (p, q) {
    let a = diagonal(p._x - this._x, p._y - this._y)
    let b = diagonal(q._x - this._x, q._y - this._y)
    let c = diagonal(p._x - q._x, p._y - q._y)
    return Math.acos(
      (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b)
    )
  }

  // p, q => 1, 0, -1
  sign (p, q) {
    return Math.sign(
      (this._y - p._y) * (q._x - this._x) -
      (this._x - p._x) * (q._y - this._y)
    )
  }

  round (i=0) {
    return new P(round(this._x, i), round(this._y, i))
  }

  toString () {
    return Math.round(this._x).toString() + "." + Math.round(this._y)
  }

}
