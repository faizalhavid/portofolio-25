<script lang="ts">
	export let user: string = 'user';
	export let host: string = 'host';
	export let cwd: string = '~';
	export let cmd: string = '';
	export let color: string = 'green';
	export let pulse: boolean = true;
	export let onEnter: (value: string) => void = () => {};
	let input: string = '';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onEnter(input);
			input = '';
		}
	}
</script>

<div class="mt-4 flex items-center gap-2">
	<span class="text-green-400">{user}@{host}</span>
	<span class="text-blue-400">{cwd} $</span>
	{#if pulse}
		<span class="relative flex items-center">
			<div class="relative flex items-center">
				<input
					class="flex-1 border-none bg-transparent pr-2 text-white outline-none"
					bind:value={input}
					on:keydown={handleKeydown}
					autocomplete="off"
				/>
				<!-- <span
					class="absolute top-1/2 left-2 h-6 w-2 -translate-y-1/2 animate-pulse bg-white"
					style="pointer-events: none;"
				></span> -->
			</div>
		</span>
	{:else}
		<span class={`${color ?? 'text-green-400'}`}>{`${cmd}`}</span>
	{/if}
</div>
