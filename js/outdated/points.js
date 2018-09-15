export {mag, mul, normalize, add, inside, contains, eq, shared, angle,
  orientation, inbox, intersect, clockwise, triangulate, list_eq}

// n, n => n
function diagonal (a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

// p/a, p/a => bool
function eq (a, b) {
  if (typeof a[0] === 'number') return a[0] === b[0] && a[1] === b[1]
  if (a.length !== b.length) return false
  for (let len = a.length, i = 0; i < len; i++) {
    if (eq(a[0], b[i])) {
      let t = 0
      let j = i
      while (true) {
        t++
        j = (j + 1) % len
        if (!eq(a[t], b[j])) break
        if (t === len - 1) return true
      }
      t = 0
      j = i
      while (true) {
        t++
        j = (j - 1 + len) % len
        if (!eq(a[t], b[j])) break
        if (t === len - 1) return true
      }
    }
  }
  return false
}

// p => n
function mag (p) {
  return diagonal(p[0], p[1])
}

// p, n => p
function mul (p, n) {
  return p.map(i => i * n)
}

// p, n => p
function normalize (p, n=1) {
  let k = mag(p)
  if (k) return mul(p, n/k)
  return [0, 0]
}

// ...p => p
function add (...p) {
  return p.reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
}

// p, p, p => n
function angle (p, v, q) {
  let tpv = diagonal(p[0] - v[0], p[1] - v[1])
  let tqv = diagonal(q[0] - v[0], q[1] - v[1])
  let tpq = diagonal(p[0] - q[0], p[1] - q[1])
  return Math.acos(
    (Math.pow(tpv, 2) + Math.pow(tqv, 2) - Math.pow(tpq, 2)) /
    (2 * tpv * tqv)
  )
}

// t, p => bool
function inside (t, p) {
  function sign (a, b) {
    return (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]) <= 0
  }
  let temp = sign(t[1], t[2])
  return temp === sign(t[0], t[1]) && temp === sign(t[2], t[0])
}

// a, p => bool
function contains (a, p) {
  return a.some(q => eq(p, q))
}

// a, a, i => p[]
function shared (a, b) {
  return a.filter(p => contains(b, p))
}

function orientation (p, v, q) {
  return Math.sign(
    (v[1] - p[1]) * (q[0] - v[0]) -
    (v[0] - p[0]) * (q[1] - v[1])
  )
}

function inbox (p, v, q) {
  return (
    Math.max(p[0], q[0]) > v[0] &&
    Math.min(p[0], q[0]) < v[0] &&
    Math.max(p[1], q[1]) > v[1] &&
    Math.min(p[1], q[1]) < v[1]
  )
}

// e, e => bool
function intersect (e, f) {
  let o1 = orientation(e[0], e[1], f[0])
  let o2 = orientation(e[0], e[1], f[1])
  let o3 = orientation(f[0], f[1], e[0])
  let o4 = orientation(f[0], f[1], e[1])
  return (o1 !== o2 && o3 !== o4) ||
    (o1 === 0 && inbox(e[0], f[0], e[1])) ||
    (o2 === 0 && inbox(e[0], f[1], e[1])) ||
    (o3 === 0 && inbox(f[0], e[0], f[1])) ||
    (o4 === 0 && inbox(f[0], e[1], f[1]))
}

// g => bool
function clockwise (g) {
  let sum = 0
  for (let len = g.length, i = 0; i < len; i++) {
    let p = g[i]
    let q = g[(i + 1) % len]
    sum += (q[0] - p[0]) * (q[1] + p[1])
  }
  return sum > 0
}

// g, p => bool
function raycast (g, p) {
  console.log('meow')
}

function edges (g) {
  let len = g.length
  return g.map((p, i) => [p, g[(i + 1) % len]])
}

function intersect_c (g, e) {
  return edges(g).filter(f => intersect(e, f)).length
}

// g => t[]
// takes clockwise simple polygon
function triangulate (g) {
  let triangles = []
  let len = g.length
  let i = 0
  while (len > 3) {
    let [p, v, q] = [g[i ? i - 1 : len - 1], g[i], g[(i + 1) % len]]
    let g2 = g.slice(0, i).concat(g.slice(i + 1))
    if (clockwise([p, v, q]) && clockwise(g2) && intersect_c(g2, [p, q]) <= 3) {
      triangles.push([p, v, q])
      g = g2
      len--
    }
    i = (i + 1) % len
  }
  triangles.push(g)
  return triangles
}

function list_eq (gl1, gl2) {
  for (let g of gl1) {
    if (!gl2.find(h => eq(g, h))) return false
  }
  return gl1.length === gl2.length
}
