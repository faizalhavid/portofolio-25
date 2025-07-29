<script lang="ts">
	import Prompt from './Prompt.svelte';
	import DirectoryEntry from './DirectoryEntry.svelte';

	export let user: string = 'user';
	export let host: string = 'host';

	export let item: {
		content: any;
		name: string;
		perms: string;
		count: number;
		owner: string;
		group: string;
		size: number;
		date: string;
		type: 'dir' | 'file';
		children: { name: string }[];
		path: string;
		cwd?: string;
	};
</script>

<details class="group">
	<summary
		class="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-2 transition-all hover:bg-green-900/10 md:flex-nowrap md:gap-4"
	>
		<span class="min-w-[4rem] font-medium text-white/60">{item.perms}</span>
		<span class="w-6 min-w-[1.5rem] text-center font-medium text-white/60">{item.count}</span>
		<span class="w-16 min-w-[4rem] font-medium text-white/60">{item.owner}</span>
		<span class="w-16 min-w-[4rem] font-medium text-white/60">{item.group}</span>
		<span class="w-16 min-w-[4rem] text-right font-medium text-white/60">{item.size}</span>
		<span class="w-28 min-w-[7rem] font-medium text-white/60">{item.date}</span>
		<span class="flex-1 font-medium text-green-300">{item.path}</span>
		<span class="ml-2 font-medium text-green-500 group-open:hidden">▶</span>
		<span class="ml-2 hidden text-green-500 group-open:inline">▼</span>
	</summary>
	<div class="relative flex">
		<div class="relative w-12 flex-shrink-0 md:w-12"></div>
		<div class="flex-1">
			<div class="relative flex flex-row">
				{#if item.children}
					{#if item.type == 'dir'}
						<span class="absolute top-0 left-[-1.5rem] h-4 w-6 -translate-y-1/2">
							<span class="block h-4 w-4 rounded-bl-xl border-b-2 border-l-2 border-green-700"
							></span>
						</span>
						<div class="flex flex-col">
							{#each Object.entries(item.children) as [childName, child]}
								<DirectoryEntry
									{user}
									{host}
									item={{
										...item,
										...child,
										name: childName,
										path: `${item.path}/${childName}`,
										cwd: item.cwd
									}}
								/>
							{/each}
						</div>
					{:else if item.type === 'file'}
						<span class="absolute top-0 left-[-1.5rem] h-4 w-6 -translate-y-1/2">
							<span class="block h-4 w-4 rounded-bl-xl border-b-2 border-l-2 border-green-700"
							></span>
						</span>
						<div class="flex flex-row">
							<span class="text-green-400">Content:</span>
							<span class="ml-2">{item.content}</span>
						</div>
					{/if}
				{/if}
			</div>
			<ul class="ml-6">
				{#each item.children as tech}
					<li class="relative flex items-center">
						<span class="mr-2 text-green-700">-</span>
						<span>{tech}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</details>
