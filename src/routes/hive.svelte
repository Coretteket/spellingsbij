<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Cell from './cell.svelte'

  let { letters, ...attrs } = $props<{ letters: string[] } & HTMLAttributes<HTMLElement>>()
</script>

<div {...attrs}>
  {#each letters as letter, i}
    <Cell {letter} yellow={i === 0}/>
  {/each}
</div>

<style>
  div {
    aspect-ratio: 0.9623;
    position: relative;
  }
</style>
