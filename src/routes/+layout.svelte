<script lang="ts">
  import '@fontsource/atkinson-hyperlegible'
  import '../app.css'

  const { children } = $props()
</script>

<main class="mx-auto max-w-xl">
  <header class="flex items-center gap-2.5 px-4 py-4">
    <img src="/logo.png" width={26} height={26} alt="" />
    <h1 class="text-2xl font-bold">Spellingsbij</h1>
  </header>

  {@render children()}
</main>
