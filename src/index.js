function curry (fn) {
  let totalArgs = fn.length

  return function (...args) {
    let suppliedArgs = args.length
    if (suppliedArgs < totalArgs) {
      return function (...remainingArgs) {
        return curry(fn)(...args, ...remainingArgs)
      }
    }

    return fn(...args)
  }
}

let foldRight = curry(function (fn, arr, ...args) {
  return arr.reduceRight(fn, ...args)
})

let fold = curry(function (fn, arr, ...args) {
  return arr.reduce(fn, ...args)
})

let map = curry(function (fn, arr) {
  return arr.map(fn)
})

let filter = curry(function (fn, arr) {
  return arr.filter(fn)
})

function composeFn (acc, fn) {
  return fn(acc)
}

function compose (...fns) {
  return function (...args) {
    return foldRight(composeFn, fns, ...args)
  }
}

function pipe (...fns) {
  return function (...args) {
    return fold(composeFn, fns, ...args)
  }
}

let take = curry(function(amount, arr) {
  return arr.slice(0, amount)
})

let takeLast = curry(function(amount, arr) {
  return arr.slice(-amount)
})

function head (arr) {
  let [head] = arr
  return head
}

function tail (arr) {
  let [, ...tail] = arr
  return tail
}

function fst (arr) {
  return head(arr)
}

function snd (arr) {
  return compose(head, tail)(arr)
}
