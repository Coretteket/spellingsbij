<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Cell from './cell.svelte'

  let { letters, ...attrs } = $props<{ letters: string[] } & HTMLAttributes<HTMLElement>>()
</script>

<div {...attrs}>
  {#each letters as letter}
    <Cell {letter} />
  {/each}
</div>

<style>
  div {
    aspect-ratio: 0.9623;
    position: relative;
  }
</style>
