const makeProps = (pp) => {
  const res = Object.keys(pp).reduce((acc, k) => {
    const type = pp[k]
    acc[k] = { type }
    return acc
  }, {})
  return res
}

export const makeKind = (pp) => {
  const properties = makeProps(pp)
  return { properties }
}
