<script lang="ts">
	import Prompt from './Prompt.svelte';

	export let user: string = 'user';
	export let host: string = 'host';

	export let item: {
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
	};
</script>

<details class="group">
	<summary
		class="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-2 transition-all hover:bg-green-900/10 md:flex-nowrap md:gap-4"
	>
		<span class="min-w-[4rem]">{item.perms}</span>
		<span class="w-6 min-w-[1.5rem] text-center">{item.count}</span>
		<span class="w-16 min-w-[4rem]">{item.owner}</span>
		<span class="w-16 min-w-[4rem]">{item.group}</span>
		<span class="w-16 min-w-[4rem] text-right">{item.size}</span>
		<span class="w-28 min-w-[7rem]">{item.date}</span>
		<span class="flex-1 text-green-300">{item.path}</span>
		<span class="ml-2 text-green-500 group-open:hidden">▶</span>
		<span class="ml-2 hidden text-green-500 group-open:inline">▼</span>
	</summary>
	<div class="relative flex">
		<div class="relative w-12 flex-shrink-0 md:w-12"></div>
		<div class="flex-1">
			<div class="relative flex flex-row">
				<span class="absolute top-1/4 left-[-1.5rem] h-4 w-6 -translate-y-1/2">
					<span class="block h-4 w-4 rounded-bl-xl border-b-2 border-l-2 border-green-700"></span>
				</span>
				<Prompt {user} {host} cmd={'cat stack.txt'} pulse={false} />
			</div>
			<ul class="ml-6">
				{#each item.stack as tech}
					<li class="relative flex items-center">
						<span class="mr-2 text-green-700">-</span>
						<span>{tech}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</details>
