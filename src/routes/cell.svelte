<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  let { letter, ...attrs } = $props<{ letter: string } & HTMLAttributes<HTMLElement>>()
</script>

<article {...attrs}>
  <div class="relative">
    <svg viewBox="0 0 120 103.92304845413263">
      <polygon
        points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
        fill="#f0f0f0"
        stroke="white"
        stroke-width="7.5"
      />
    </svg>
    <p class="uppercase top-1/2 w-full text-center -translate-y-1/2 absolute">{letter}</p>
  </div>
</article>

<style>
  p {
    font-size: 1.5em;
  }

  article {
    position: absolute;
    width: 40%;
    margin-left: 30%;
    margin-top: 35%;
  }

  article:nth-child(2) {
    transform: translate(0, -100%);
  }

  article:nth-child(5) {
    transform: translate(0, 100%);
  }

  article:nth-child(3) {
    transform: translate(75%, -50%);
  }

  article:nth-child(4) {
    transform: translate(75%, 50%);
  }

  article:nth-child(7) {
    transform: translate(-75%, -50%);
  }

  article:nth-child(6) {
    transform: translate(-75%, 50%);
  }
</style>
