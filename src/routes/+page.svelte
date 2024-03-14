<script lang="ts">
  import '@fontsource/atkinson-hyperlegible'
  import '../app.css'

  import Hive from './hive.svelte'

  import { shuffle } from '$lib/util'
  import { clsx } from 'clsx'

  let { data } = $props()

  let word = $state('')

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
    if (event.key === 'Backspace') {
      word = word.slice(0, -1)
    }
    if (event.key.match(/^[a-z]$/i)) {
      word += event.key
    }
  }

  function onPress(letter: string) {
    word += letter
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header class="flex items-center gap-2 border-b border-gray-200 px-4 py-2.5">
  <img src="/logo.png" width={25} height={25} alt="" />
  <h1 class="text-2xl font-bold">Spellingsbij</h1>
</header>

<div class="mx-6 my-4 rounded-md border border-gray-200 px-4 py-2 text-gray-500">Woorden</div>

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
  <button class="rounded-full border px-4 py-2">Oké</button>
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
