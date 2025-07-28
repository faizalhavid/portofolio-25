<script lang="ts">
	export let user: string = 'user';
	export let host: string = 'host';
	export let cwd: string = '~';
	export let pulse: boolean = true;
	export let cmd: string = '';
</script>

<div class="flex items-center gap-2 py-2">
	<span class="text-green-500">{`${user}@${host}`} </span>
	<span class="text-white">:</span>
	<span class="text-blue-400">{cwd}</span>
	<span class="text-white">$</span>
	{#if pulse}
		<span class="animate-pulse text-green-400">█</span>
	{:else}
		<span class="text-green-500">{`${cmd}`}</span>
	{/if}
</div>
