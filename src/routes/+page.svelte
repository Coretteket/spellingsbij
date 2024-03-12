<script lang="ts">
  import '@fontsource/atkinson-hyperlegible'
  import '../app.css'

  import Hive from './hive.svelte'

  import { shuffle } from '$lib/util'

  let { data } = $props()

  let otherLetters = $state(data.letters.filter((l) => l !== data.letter))
  $effect(() => void (otherLetters = data.letters.filter((l) => l !== data.letter)))

  const letters = $derived([data.letter, ...otherLetters])

  function onShuffle() {
    otherLetters = shuffle(otherLetters)
  }

  const pangrams = $derived(data.answers.filter((a) => new Set(a).size === 7))
</script>

<header class="mx-2 p-2 border-b border-gray-200 flex gap-2 items-center">
  <img src="/logo.png" width={25} height={25} alt="" />
  <h1 class="font-bold text-2xl">Spellingsbij</h1>
</header>

<Hive {letters} class="w-[300px] my-4 mx-auto" />

<button onclick={onShuffle}>Shuffle</button>

<pre>{JSON.stringify(pangrams, null, 2)}</pre>

{data.maxScore}
