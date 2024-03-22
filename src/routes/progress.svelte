<script lang="ts">
  import clsx from 'clsx'

  type Props = { score: number; maxScore: number }
  let { score, maxScore }: Props = $props()

  const ranks = [0, 3.2, 7.2, 12.2, 23.2, 35.2, 56.2, 72.2, 100] as const
  const rankNames = [
    'Beginner',
    'Op weg',
    'Netjes',
    'Prima',
    'Goed',
    'Mooi',
    'Super',
    'Geweldig',
    'Geniaal'
  ] as const

  const rankIndex = $derived(ranks.findLastIndex((r) => score / maxScore >= r / 100))

  const style = $derived(`
    left: ${(rankIndex / (ranks.length - 1)) * 100}%;
    transform: translateX(${(-rankIndex / (ranks.length - 1)) * 100}%)
  `)
</script>

<div class="mx-6 flex items-center justify-stretch">
  <div class="w-[78px]">
    <b>{rankNames[rankIndex]}</b>
  </div>
  <div class="relative flex-1 py-3">
    <div class="flex justify-between px-2">
      <div class="absolute inset-x-3 my-[3px] h-[1px] rounded-full bg-neutral-300"></div>
      <div
        class="absolute inset-x-3 my-[3px] h-[1px] origin-left rounded-full bg-[rgb(245,208,61)] transition-all"
        style="transform: scaleX({(rankIndex / (ranks.length - 1)) * 100}%)"
      ></div>
      {#each ranks as _, i}
        <div
          class={clsx(
            'z-10 aspect-square w-[7px] transition-all',
            i < ranks.length - 1 && 'rounded-full',
            i <= rankIndex ? 'bg-[rgb(245,208,61)]' : 'bg-neutral-300'
          )}
        ></div>
      {/each}
    </div>
    <div
      class="absolute top-0 z-20 flex aspect-square w-8 items-center justify-center rounded-full bg-[rgb(245,208,61)] text-xs transition-all"
      {style}
    >
      {score}
    </div>
  </div>
</div>
