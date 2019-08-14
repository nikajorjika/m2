const trailingSlashRE = /\/?$/

export function isSamePath(a, b) {
  if (!b) {
    return false
  } else if (a && b) {
    return (
      a.replace(trailingSlashRE, '') === b.replace(trailingSlashRE, '') ||
      a === b
    )
  } else {
    return false
  }
}
