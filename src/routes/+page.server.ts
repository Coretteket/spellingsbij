import { createRandom } from '$lib/server/random'
import { shuffle } from '$lib/util'
import combis from '$lib/server/combis'
import words from '$lib/server/words'

export const prerender = true

export function load() {
  const random = createRandom()
  const combi = combis[Math.floor(random() * combis.length)]
  const [letter, maxScore, answers] = [...combi]
    .map((l) => [l, ...getValues(combi, l, words)] as const)
    .sort(([, a], [, b]) => Math.abs(a - 200) - Math.abs(b - 200))[0]
  return { letters: shuffle(combi.split('')), letter, maxScore, answers }
}

function getValues(combi: string, letter: string, words: string[]) {
  const answers = words.filter(
    (word) => [...word].every((l) => combi.includes(l)) && word.includes(letter)
  )

  const maxScore = answers.reduce((score, word) => {
    const pangram = [...combi].every((l) => word.includes(l))
    if (pangram) return score + word.length + 7
    if (word.length === 4) return score + 1
    return score + word.length
  }, 0)

  return [maxScore, answers] as const
}
