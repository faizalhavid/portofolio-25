<!-- Layout.svelte atau +layout.svelte -->
<script lang="ts">
	import '../app.css';
</script>

<div class="-z-1 min-h-screen overflow-x-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
	<main class="mx-auto max-w-screen-lg px-4">
		<slot />
	</main>
</div>

<style>
</style>
