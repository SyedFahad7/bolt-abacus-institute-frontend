export const paginate = <T,>(arr: T[], page = 0, per = 10) => {
  const start = page * per
  return arr.slice(start, start + per)
}

export default { paginate }
