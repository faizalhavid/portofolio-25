<!-- Layout.svelte atau +layout.svelte -->
<script lang="ts">
	import '../app.css';
</script>

<style>


</style>

<div class="min-h-screen overflow-x-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
<main class="px-4 max-w-screen-lg mx-auto">
  <slot />
</main>
</div>