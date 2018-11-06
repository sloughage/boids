/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(6);


class P {

  constructor (x, y) {
    this._x = Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* round */])(x, 3)
    this._y = Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* round */])(y, 3)
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
    return Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diagonal */])(this._x, this._y)
  }

  // p => n
  d (p) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diagonal */])(this._x - p._x, this._y - p._y)
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
    let a = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diagonal */])(p._x - this._x, p._y - this._y)
    let b = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diagonal */])(q._x - this._x, q._y - this._y)
    let c = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diagonal */])(p._x - q._x, p._y - q._y)
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
    return new P(Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* round */])(this._x, i), Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* round */])(this._y, i))
  }

  toString () {
    return Math.round(this._x).toString() + "." + Math.round(this._y)
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = P;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = drawClear;
/* harmony export (immutable) */ __webpack_exports__["c"] = drawCircle;
/* harmony export (immutable) */ __webpack_exports__["e"] = drawLine;
/* harmony export (immutable) */ __webpack_exports__["b"] = drawBox;
/* harmony export (immutable) */ __webpack_exports__["f"] = drawText;
/* unused harmony export write */
/* harmony export (immutable) */ __webpack_exports__["g"] = partition;
/* unused harmony export inBox */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__p_P__ = __webpack_require__(0);


const canvas = document.getElementById("canvas")
/* harmony export (immutable) */ __webpack_exports__["a"] = canvas;


const ctx = canvas.getContext("2d")
/* unused harmony export ctx */


function drawClear () {
  ctx.clearRect(0, 0, 720, 360)
}

function drawCircle (p, r, color) {
  ctx.beginPath()
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}

function drawLine (e, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(e.p.x, e.p.y)
  ctx.lineTo(e.q.x, e.q.y)
  ctx.stroke()
  ctx.closePath()
}

function drawBox (p, size, fill, edge) {
  ctx.fillStyle = fill
  ctx.fillRect(p.x, p.y, size.x, size.y)
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = edge
  ctx.rect(p.x, p.y, size.x, size.y)
  ctx.stroke()
}

function drawText (p, txt) {
  ctx.fillStyle = "#fff"
  ctx.font = "small-caps 12px Arial";
  ctx.fillText(txt, p.x, p.y)
}

function write (txt_list) {
  ctx.fillStyle = '#fff'
  ctx.font = "16px Arial"
  text_list.forEach((txt, i) => {
    ctx.fillText(text, 5, 16 * i)
  })
}

// a, f => [a, a]
function partition (a, f) {
  let m = [],
      n = []
  a.forEach(k => {
    if (f(k)) m.push(k)
    else n.push(k)
  })
  return [m, n]
}

function inBox (p, box_p, box_size) {
  return p.x >= box_p.x &&
         p.x <= box_p.x + box_size.x &&
         p.y >= box_p.y &&
         p.y <= box_p.y + box_size.y
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__P__ = __webpack_require__(0);


class E {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = E;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LevelEditor_main__ = __webpack_require__(4);

// import './test/Level'
// import './test/G'


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lvl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draw__ = __webpack_require__(10);




let state = new __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */]()

function update (state) {
  if (state.lvl.hold) Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["c" /* move */])(state.lvl, state.mouse.p)
  while (state.queue.length) {
    switch (state.queue.shift()) {
      case "mousedown": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["a" /* click */])(state.lvl, state.mouse.p, state.key.sel); break
      case "mouseup": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["f" /* unclick */])(state.lvl); break
      case "unlink": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["g" /* unlink */])(state.lvl); break
      case "delete": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["b" /* del */])(state.lvl); break
      case "left": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["e" /* step */])(state.lvl, "left"); break
      case "up": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["e" /* step */])(state.lvl, "up"); break
      case "right": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["e" /* step */])(state.lvl, "right"); break
      case "down": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["e" /* step */])(state.lvl, "down"); break
      case "polygonate": Object(__WEBPACK_IMPORTED_MODULE_1__lvl__["d" /* polygonate */])(state.lvl)
    }
  }
}

function main () {
  update(state)
  Object(__WEBPACK_IMPORTED_MODULE_2__draw__["a" /* default */])(state)
  window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__p_P__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor () {
    this.key = {
      sel: null,
      add: false,
      link: false,
      unlink: false,
      delete: false,
      left: false,
      up: false,
      right: false,
      down: false,
      shift: false
    }
    this.mouse = {
      p: new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](0, 0),
      sp: new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](0, 0),
      down: false
    }
    this.lvl = {
      p_list: [],
      e_list: [],
      p_error: [],
      e_error: [],
      sel: null,
      hold: null
    }
    this.canvas = getDimensions()
    this.queue = []

    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* canvas */].addEventListener("mousedown", e => {
      this.mouse.sp = this.mouse.p
      this.mouse.down = true
      this.queue.push("mousedown")
    })

    document.addEventListener("mouseup", e => {
      this.mouse.down = false
      this.queue.push("mouseup")
    })

    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 49:
          this.key.sel = (this.key.sel === "add") ^ this.key.add ? null : "add"
          this.key.add = true
          break
        case 50:
          this.key.sel = (this.key.sel === "link") ^ this.key.link ? null : "link"
          this.key.link = true
          break
        case 51:
          if (!this.key.unlink) this.queue.push("unlink")
          this.key.unlink = true
          this.key.sel = null
          break
        case 52:
          if (!this.key.delete) this.queue.push("delete")
          this.key.delete = true
          this.key.sel = null
          break
        case 53:
          this.queue.push("polygonate")
          break
        case 37:
          this.queue.push("left")
          this.key.left = true
          break
        case 38:
          this.queue.push("up")
          this.key.up = true
          break
        case 39:
          this.queue.push("right")
          this.key.right = true
          break
        case 40:
          this.queue.push("down")
          this.key.down = true
          break
      }
    })

    document.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case 49: this.key.add = false; break
        case 50: this.key.link = false; break
        case 51: this.key.unlink = false; break
        case 52: this.key.delete = false; break
        case 37: this.key.left = false; break
        case 38: this.key.up = false; break
        case 39: this.key.right = false; break
        case 40: this.key.down = false; break
      }
    })

    document.addEventListener("mousemove", e => {
      let middle = (a, b, c) => Math.min(Math.max(a, b), c)
      this.mouse.p = new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](
        middle(0, e.clientX - this.canvas.left, this.canvas.width),
        middle(0, e.clientY - this.canvas.top, this.canvas.height)
      )
    })
  }
});

function getDimensions () {
  const rect = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* canvas */].getBoundingClientRect()
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return diagonal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return round; });
function diagonal (a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

function round (n, i) {
  let k = Math.pow(10, i)
  return Math.round(n * k) / k
}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = polygonate;
/* harmony export (immutable) */ __webpack_exports__["a"] = click;
/* harmony export (immutable) */ __webpack_exports__["g"] = unlink;
/* harmony export (immutable) */ __webpack_exports__["b"] = del;
/* harmony export (immutable) */ __webpack_exports__["e"] = step;
/* harmony export (immutable) */ __webpack_exports__["c"] = move;
/* harmony export (immutable) */ __webpack_exports__["f"] = unclick;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__p_P__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__p_E__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__p_G__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);





function validate (lvl) {
  lvl.p_error = lvl.p_list
    .map(p => lvl.e_list.filter(e => e.includes(p)).length !== 2)
  lvl.e_error = lvl.e_list
    .map(e => lvl.e_list.some(f => !f.shared(e).length && f.intersect(e)))
}

function polygonate (lvl) {
  if (!lvl.p_error.some(x=>x) && !lvl.e_error.some(x=>x)) {
    let gs = makeGs(lvl.p_list, lvl.e_list)
    gs = combineGs(gs)
    console.log(gs)
  }

  // g[] -> g[]
  function combineGs (gs) {
    let rg = []
    while (gs.length) {
      let [g_1, g_out] = Object(__WEBPACK_IMPORTED_MODULE_3__util__["g" /* partition */])(gs, g => gs.some(h => h.contains(g)))
      let [g_2, g_in] = Object(__WEBPACK_IMPORTED_MODULE_3__util__["g" /* partition */])(g_1, g => g_1.some(h => h.contains(g)))
      for (let g of g_in) {
        for (let i = 0, len = g_out.length; i < len; i++) {
          if (g_out[i].contains(g)) g_out[i] = g_out[i].join(g)
        }
      }
      gs = g_2
      rg = rg.concat(g_out)
    }
    return rg
  }

  // p[], e[] -> g[]
  function makeGs (p_s, e_s) {
    let rarr = [],
      ps = p_s.slice(),
      es = e_s.slice()
    while (ps.length) {
      let robj = makeG(ps, es)
      ps = robj.ps
      es = robj.es
      rarr.push(robj.g)
    }
    return rarr
  }

  // p[], e[] -> g
  function makeG (p_s, e_s) {
    let g = [],
      ps = p_s.slice(),
      es = e_s.slice(),
      p = ps.shift()
    while (p) {
      g.push(p)
      let i = es.findIndex(e => e.includes(p)),
        e = es[i]
      es.splice(i, 1)
      p = e.other(p)
      i = ps.findIndex(q => q.eq(p))
      if (i === -1) break
      ps.splice(i, 1)
    }
    g = new __WEBPACK_IMPORTED_MODULE_2__p_G__["a" /* default */](...g)
    return {ps, es, g}
  }
}

function click (lvl, mouse_p, key) {
  let p = lvl.p_list.find(q => q.d(mouse_p) <= 4)
  if (key === "add" || key === "link") {
    if (!p) {
      p = mouse_p
      lvl.p_list.push(p)
    }
    if (key === "link" && lvl.sel && !p.eq(lvl.sel)) {
      const e = new __WEBPACK_IMPORTED_MODULE_1__p_E__["a" /* default */](lvl.sel, p)
      if (!lvl.e_list.find(f => f.eq(e))) lvl.e_list.push(e)
    }
  } else if (p && lvl.sel && p.eq(lvl.sel)) {
    lvl.hold = true
  }
  lvl.sel = p || null
  validate(lvl)
}

function unlink (lvl) {
  if (lvl.sel) {
    lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
    validate(lvl)
  }
}

function del (lvl) {
  if (lvl.sel) {
    lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
    lvl.p_list.splice(lvl.p_list.findIndex(p => p.eq(lvl.sel)), 1)
    lvl.sel = null
    validate(lvl)
  }
}

function replace (lvl, new_p) {
  lvl.p_list = lvl.p_list.filter(p => !p.eq(lvl.sel))
  lvl.p_list.push(new_p)
  let e_temp = lvl.e_list.filter(e => e.includes(lvl.sel))
  lvl.e_list = lvl.e_list.filter(e => !e.includes(lvl.sel))
  e_temp.forEach(e => lvl.e_list.push(new __WEBPACK_IMPORTED_MODULE_1__p_E__["a" /* default */](new_p, e.other(lvl.sel))))
  lvl.sel = new_p
}

function step (lvl, dir) {
  if (lvl.sel) {
    let new_p = lvl.sel.add(new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](
      dir === "left" ? -1 : dir === "right" ? 1 : 0,
      dir === "up" ? -1 : dir === "down" ? 1 : 0
    ))
    replace(lvl, new_p)
    validate(lvl)
  }
}

function move (lvl, mouse_p) {
  replace(lvl, mouse_p)
  validate(lvl)
}

function unclick (lvl) {
  lvl.hold = false
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__P__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__E__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__T__ = __webpack_require__(9);




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
  return c.map((p, i) => new __WEBPACK_IMPORTED_MODULE_1__E__["a" /* default */](p, c[(i + 1) % len]))
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
        f = new __WEBPACK_IMPORTED_MODULE_1__E__["a" /* default */](p, q),
        c2 = c.slice(0, i).concat(c.slice(i + 1))
    if (
      clockwise([p, v, q]) &&
      clockwise(c2) &&
      !e_list.filter(e => e.intersect(f) && !e.includes(p) && !e.includes(q)).length
    ) {
      t_list.push(new __WEBPACK_IMPORTED_MODULE_2__T__["a" /* default */](p, v, q))
      c = c2
      len--
    }
    i = (i + 1) % len
  }
  t_list.push(new __WEBPACK_IMPORTED_MODULE_2__T__["a" /* default */](...c))
  return t_list
}

class G {

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
        let e = new __WEBPACK_IMPORTED_MODULE_1__E__["a" /* default */](this._p[i], g._p[j])
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
/* harmony export (immutable) */ __webpack_exports__["a"] = G;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__P__ = __webpack_require__(0);


class T {

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
/* harmony export (immutable) */ __webpack_exports__["a"] = T;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = draw;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__p_P__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);



function lvl (lvl) {
  lvl.e_list.forEach((e, i) => {
    Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* drawLine */])(e, lvl.e_error[i] ? "#f00" : "#fff")
  })
  lvl.p_list.forEach((p, i) => {
    Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* drawCircle */])(p, 4, lvl.p_error[i] ? "#f00" : "#fff")
    if (!lvl.sel || !p.eq(lvl.sel)) Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* drawCircle */])(p, 4 - 1, "#000")
  })
}

const buttons = [
  {id: "add", txt: "1 Add"},
  {id: "link", txt: "2 Link"},
  {id: "unlink", txt: "3 Unlink"},
  {id: "delete", txt: "4 Delete"}
]

function ui (key, mouse_p, sel) {
  buttons.forEach((b, i) => {
    const p = new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](659, 27 * i + 10)
    Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* drawBox */])(p, new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](51, 20), key[b.id] ? "#444" : "#000", "#fff")
    if (b.id === key.sel) Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* drawBox */])(p.add(new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](48, 0)), new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](3, 20), "#fff", "#fff")
    Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* drawText */])(p.add(new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](3, 14)), b.txt)
  })
  const p = new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](659, 314)
  Object(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* drawBox */])(p, new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](51, 36), "#000", "#fff")
  Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* drawText */])(p.add(new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](3, 14)), mouse_p.toString())
  Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* drawText */])(p.add(new __WEBPACK_IMPORTED_MODULE_0__p_P__["a" /* default */](3, 30)), sel ? sel.toString() : "--")
}

function draw (state) {
  Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* drawClear */])()
  lvl(state.lvl)
  ui(state.key, state.mouse.p, state.lvl.sel)
}


/***/ })
/******/ ]);