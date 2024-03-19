export function getScore(combi: string[], word: string) {
  if (combi.every((l) => word.includes(l))) return word.length + 7
  return word.length === 4 ? 1 : word.length
}
