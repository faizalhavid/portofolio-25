<script lang="ts">
	import Divider from '../Divider.svelte';

	export let name: string = '';
	export let description: string = '';
	export let externalLink: string = '';
	export let avatar: string = '';
	export let image: string = '';

	let bg = () => {
		if (image) {
			return `bg-[url('${image}')] bg-cover bg-center`;
		}
		return 'bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-400';
	};
</script>

<div class={`flex w-[400px] min-w-6 flex-row gap-4 rounded-3xl p-4 shadow-lg ${bg}`}>
	<div class="flex-shrink-0">
		{#if avatar}
			<img src={avatar} alt="Client Avatar" class="h-16 w-16 rounded-full object-cover" />
		{:else}
			<div class="h-16 w-16 rounded-full bg-neutral-300 dark:bg-neutral-600">
				{name.charAt(0) ? name.charAt(0).toUpperCase() : '?'}
			</div>
		{/if}
		<div class="ml-4">
			<h3 class="text-lg font-semibold">{name}</h3>
			<p class="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
		</div>
	</div>
	<!-- {#if externalLink}
		<a
			href={externalLink}
			class="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
		>
			Visit Website
		</a>
	{/if} -->
	<div class="flex-1"></div>
	<div class="flex items-center justify-center">
		<div class="ml-2">
			<p class="text-sm text-neutral-500">Name: {name}</p>
			<p class="text-sm text-neutral-500">Description: {description}</p>
		</div>
	</div>
</div>
