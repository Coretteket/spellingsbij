import { createDailyRandom } from '$lib/random'
import { shuffle } from '$lib/util'
import combis from '$lib/server/combis'
import words from '$lib/server/words'
import { getScore } from '$lib/score'

export const prerender = true

export function load() {
  const random = createDailyRandom()
  const combi = combis[Math.floor(random() * combis.length)]

  const [letter, maxScore, answers] = [...combi]
    .map((l) => {
      const answers = words.filter(
        (word) => word.split('').every((l) => combi.includes(l)) && word.includes(l)
      )

      const maxScore = answers.reduce((score, word) => score + getScore(combi.split(''), word), 0)

      return [l, maxScore, answers] as const
    })
    .filter(([, maxScore]) => maxScore >= 100 && maxScore <= 500)
    .sort(([, a], [, b]) => Math.abs(a - 175) - Math.abs(b - 175))[0]

  return { letters: shuffle(combi.split('')), letter, maxScore, answers }
}
