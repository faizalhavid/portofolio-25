<script lang="ts">
	import DirectoryEntry from './DirectoryEntry.svelte';
	import Prompt from './Prompt.svelte';
	export let user: string = 'user';
	export let host: string = 'host';
	export let title: string = '';
	export let command: string[] = [];
	export let data: Array<{
		name: string;
		perms: string;
		count: number;
		owner: string;
		group: string;
		size: number;
		date: string;
		stack: string[];
		path: string;
		cwd?: string;
	}> = [];
	export let cwd: string = '~';
	export let history: string[] = [];
</script>

<div
	class={`card-hovering mx-auto w-full rounded-xl border border-primary-50 bg-primary-900  shadow-lg`}
	style="font-family: 'Fira Code', monospace;"
>
	<!-- Header bar -->
	<div
		class="flex items-center justify-between rounded-t-xl border-b border-primary-900 bg-primary-50 px-4 pt-3 pb-2"
	>
		<span class="text-xs tracking-tight text-neutral-900">../skills/{title}</span>
		<div class="flex gap-2">
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
		</div>
	</div>
	<!-- Terminal content area -->
	<div
		class="rounded-b-xl border-t border-primary-900 bg-primary-900 px-4 py-3 font-mono text-sm text-neutral-100"
	>
		{#each command as item, index}
			<p class="mb-2 text-xs text-neutral-400 italic">{item}</p>
		{/each}
		<div
			class="w-full max-w-full overflow-x-auto rounded-lg p-0 font-mono text-sm text-green-400 shadow-lg md:p-4"
		>
			<div class="px-4 py-2">
				{#if history && history.length > 0}
					{#each history as cmd}
						<Prompt {user} {host} {cwd} pulse={false} {cmd} />
					{/each}
				{/if}
				{#each data as item}
					<DirectoryEntry {item} {user} {host} />
				{/each}
				<!-- current prompt -->
				<Prompt {user} {host} />
			</div>
		</div>
	</div>
</div>
