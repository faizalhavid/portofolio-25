<script lang="ts">
	export let user: string = 'user';
	export let host: string = 'host';
	export let cwd: string = '~';
	export let cmd: string = '';
	export let color: string = 'green';
	export let pulse: boolean = true;
	export let placeholder: string = 'Type a command...';
	export let onEnter: (value: string) => void = () => {};
	let input: string = '';

	let showCursor = true;
	let cursorInterval: any;

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onEnter(input);
			input = '';
		}
	}

	$: if (pulse) {
		clearInterval(cursorInterval);
		cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);
	} else {
		clearInterval(cursorInterval);
		showCursor = true;
	}

	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	onDestroy(() => clearInterval(cursorInterval));
</script>

<div class="mt-4 flex items-center gap-2" transition:fade={{ duration: 400 }}>
	<span class="text-green-400">{user}@{host}</span>
	<span class="text-blue-400">{cwd} $</span>
	{#if pulse}
		<input
			class="flex-1 border-none bg-transparent pr-2 text-white outline-none focus:border-b-2 focus:border-white focus:ring-0"
			bind:value={input}
			on:keydown={handleKeydown}
			autocomplete="off"
			{placeholder}
			style="caret-color: {showCursor ? 'white' : 'transparent'};"
			transition:fade={{ duration: 400 }}
		/>
	{:else}
		<span class={`${color ?? 'text-green-400'}`} transition:fade={{ duration: 400 }}
			>{`${cmd}`}</span
		>
	{/if}
</div>
