<script lang="ts">
  import '@fontsource/atkinson-hyperlegible'
  import '../app.css'

  import Hive from './hive.svelte'

  import { shuffle } from '$lib/util'
  import { clsx } from 'clsx'

  let { data } = $props()

  let foundWords = $state<string[]>([])
  let word = $state('')

  const score = $derived(
    foundWords.reduce((score, word) => {
      const pangram = data.letters.every((l) => word.includes(l))
      if (pangram) return score + word.length + 7
      if (word.length === 4) return score + 1
      return score + word.length
    }, 0)
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

<header class="flex items-center gap-2 border-b border-gray-200 px-4 py-2.5">
  <img src="/logo.png" width={25} height={25} alt="" />
  <h1 class="text-2xl font-bold">Spellingsbij</h1>
</header>

<b class="mx-6 my-4 block">{score}</b>

<div class="mx-6 my-4 flex gap-2 rounded-md border border-gray-200 px-4 py-2">
  {#each foundWords as word}
    <span class="capitalize">{word}</span>
  {/each}
  {#if foundWords.length < 1}
    <span class="text-gray-500">Geen woorden gevonden</span>
  {/if}
</div>

<div class="mx-auto my-4 flex h-10 w-max items-center">
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
  <button onclick={onDelete} class="rounded-full border px-4 py-2">Wis</button>
  <button onclick={onShuffle} class="rounded-full border px-4 py-2">&#x1f500;</button>
  <button onclick={onSubmit} class="rounded-full border px-4 py-2">Oké</button>
</div>

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
