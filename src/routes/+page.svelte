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

<header class="mx-2 p-2 border-b border-gray-200 flex gap-2 items-center">
  <img src="/logo.png" width={25} height={25} alt="" />
  <h1 class="font-bold text-2xl">Spellingsbij</h1>
</header>

<div class="mx-6 border border-gray-200 text-gray-500 px-4 py-2 my-4 rounded-md">Woorden</div>

<div class="my-4 h-10 mx-auto w-max flex items-center">
  <div>
    {#each word as letter}
      <span
        class={clsx(
          'text-4xl uppercase font-bold',
          letter === data.letter && 'text-[#f5d03d]',
          !letters.includes(letter) && 'text-neutral-300'
        )}>{letter}</span
      >
    {/each}
  </div>
  <div class="bg-[#f5d03d] ml-0.5 -mr-1 w-[3px] h-full rounded animate-blink" />
</div>

<Hive {letters} {onPress} class="w-[350px] my-4 mx-auto" />

<button onclick={onShuffle}>Shuffle</button>

{data.maxScore}

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
