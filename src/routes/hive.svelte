<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Cell from './cell.svelte'

  type Props = {
    letters: string[]
    onPress: (letter: string) => void
  } & HTMLAttributes<HTMLElement>

  let { letters, onPress, ...attrs } = $props<Props>()
</script>

<div {...attrs}>
  {#each letters as letter, i}
    <Cell {letter} onPress={() => onPress(letter)} yellow={i === 0} />
  {/each}
</div>

<style>
  div {
    aspect-ratio: 0.9623;
    position: relative;
  }
</style>
