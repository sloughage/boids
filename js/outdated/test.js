export default function (name, ...tests) {
  let c = 0
  for (const test of tests) {
    try {
      if (test[1] !== test[2]) throw "false"
    } catch (e) {
      if (!c) console.log("-- " + name)
      if (e === "false") console.log(" ", ...test)
      else console.log(test[0], "err")
      c++
    }
  }
  if (!c) console.log("-- " + name + ": clear")
}
