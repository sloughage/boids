function diagonal (a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

function round (n, i) {
  let k = Math.pow(10, i)
  return Math.round(n * k) / k
}

export {diagonal, round}
