<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    letter: string
    yellow: boolean
    onPress: () => void
  } & HTMLAttributes<HTMLElement>

  let { letter, yellow, onPress, ...attrs }: Props = $props()
</script>

<button {...attrs} onclick={onPress}>
  <svg viewBox="0 0 120 103.92304845413263">
    <polygon
      points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
      fill={yellow ? 'hsl(48, 90%, 60%)' : '#f0f0f0'}
      stroke="white"
      stroke-width="7.5"
    />
    <text dominant-baseline="middle" text-anchor="middle" x="50%" y="52.5%">{letter}</text>
  </svg>
</button>

<style>
  button {
    position: absolute;
    user-select: none;
    width: 40%;
    margin-left: 30%;
    margin-top: 35%;
    clip-path: polygon(25% 0%, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

    & text {
      font-size: 2em;
      font-weight: bold;
      text-transform: uppercase;
    }

    & svg {
      cursor: pointer;
    }

    & polygon {
      transform-origin: center;
      transition: scale cubic-bezier(0.4, 0, 0.2, 1) 100ms;
    }

    &:active polygon {
      scale: 0.95;
    }

    &:nth-child(2) {
      transform: translate(0, -100%);
    }

    &:nth-child(3) {
      transform: translate(75%, -50%);
    }

    &:nth-child(4) {
      transform: translate(75%, 50%);
    }

    &:nth-child(5) {
      transform: translate(0, 100%);
    }

    &:nth-child(6) {
      transform: translate(-75%, 50%);
    }

    &:nth-child(7) {
      transform: translate(-75%, -50%);
    }
  }
</style>
