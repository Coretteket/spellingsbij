<script lang="ts">
  import '../app.css'

  import { shuffle } from '$lib/util'
  import Hive from './hive.svelte'

  let { data } = $props()

  let otherLetters = $state(data.letters.filter((l) => l !== data.letter))
  $effect(() => void (otherLetters = data.letters.filter((l) => l !== data.letter)))

  const letters = $derived([data.letter, ...otherLetters])

  function onShuffle() {
    otherLetters = shuffle(otherLetters)
  }

  const pangrams = $derived(data.answers.filter((a) => new Set(a).size === 7))
</script>

<h1 class="font-bold">Hello world.</h1>

<Hive {letters} class="w-[400px]" />

<button onclick={onShuffle}>Shuffle</button>

<pre>{JSON.stringify(pangrams, null, 2)}</pre>

{data.maxScore}