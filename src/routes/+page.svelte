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

<header class="mx-2 flex items-center gap-2 border-b border-gray-200 px-2 py-2.5">
  <img src="/logo.png" width={25} height={25} alt="" />
  <h1 class="text-2xl font-bold">Spellingsbij</h1>
</header>

<div class="mx-6 my-4 rounded-md border border-gray-200 px-4 py-2 text-gray-500">Woorden</div>

<div class="mx-auto my-4 flex h-10 w-max items-center">
  <div>
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
  <div class="animate-blink -mr-1 ml-0.5 h-full w-[3px] rounded bg-[#f5d03d]" />
</div>

<Hive {letters} {onPress} class="mx-auto my-4 w-[350px]" />

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
