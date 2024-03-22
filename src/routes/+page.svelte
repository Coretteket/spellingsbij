<script lang="ts">
  import Hive from './hive.svelte'
  import Progress from './progress.svelte'

  import { getScore } from '$lib/score'
  import { shuffle } from '$lib/util'
  import { clsx } from 'clsx'

  let { data } = $props()

  let foundWords = $state<string[]>([])
  let word = $state('')

  const score = $derived(
    foundWords.reduce((score, word) => score + getScore(data.letters, word), 0)
  )

  let otherLetters = $state(data.letters.filter((l) => l !== data.letter))
  $effect(() => void (otherLetters = data.letters.filter((l) => l !== data.letter)))

  const letters = $derived([data.letter, ...otherLetters])

  function onShuffle() {
    otherLetters = shuffle(otherLetters)
  }

  function onDelete() {
    word = word.slice(0, -1)
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') onSubmit()
    if (event.key === 'Backspace') word = word.slice(0, -1)
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return
    if (event.key.match(/^[a-z]$/i)) word += event.key
  }

  function onPress(letter: string) {
    word += letter
  }

  function onSubmit() {
    if (word.length < 4) return
    if (foundWords.includes(word)) return
    if (!word.includes(data.letter)) return
    if (!data.answers.includes(word)) return
    foundWords.push(word)
    word = ''
  }
</script>

<svelte:window onkeydown={onKeydown} />

<Progress {score} maxScore={data.maxScore} />

<div class="mx-6 my-6 line-clamp-1 flex gap-2 rounded-md border border-gray-200 px-4 py-2">
  {#each foundWords as word}
    <span class="capitalize">{word.replace('ij', 'ĳ')}</span>
  {/each}
  {#if foundWords.length < 1}
    <span class="text-gray-500">Geen woorden gevonden</span>
  {/if}
</div>

<div class="mx-auto my-6 flex h-10 w-max items-center">
  <div class="mr-1">
    {#each word as letter}
      <span
        class={clsx(
          'text-4xl font-bold uppercase',
          letter === data.letter && 'text-[#f5d03d]',
          !letters.includes(letter) && 'text-neutral-300'
        )}>{letter}</span
      >
    {/each}
  </div>
  <div class="animate-blink h-full w-[3px] rounded bg-[#f5d03d]" />
</div>

<Hive {letters} {onPress} class="mx-auto my-4 w-[350px]" />

<div class="mx-auto my-8 flex w-fit gap-2">
  <button onclick={onDelete} class="rounded-full border px-4 py-2">Wissen</button>
  <button onclick={onShuffle} class="rounded-full border px-4 py-2">Schudden</button>
  <button onclick={onSubmit} class="rounded-full border px-4 py-2">Indienen</button>
</div>

<pre>
  {JSON.stringify(data.answers, null, 2)}
</pre>

<style>
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .animate-blink {
    animation: blink 1.2s step-start infinite;
  }
</style>
