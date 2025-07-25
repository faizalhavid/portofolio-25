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

<div
	class={`relative mx-4 flex h-[200px] flex-col gap-2 overflow-hidden rounded-3xl shadow-lg ${bg}`}
	style={image
		? `background-image: url('${image}'); background-size: cover; background-position: center;`
		: ''}
>
	{#if image}
		<div class="absolute inset-0 z-0 bg-gray-900/50"></div>
	{/if}
	<div class="z-10 flex h-full flex-col p-4">
		<div class="flex flex-row items-center justify-between">
			<h3 class="text-lg font-semibold">{name}</h3>
			{#if avatar}
				<img src={avatar} alt={name} class="h-16 w-16 rounded-full object-cover" />
			{:else}
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-800"
				>
					<p class="text-lgd flex h-full w-full items-center justify-center">
						{name.charAt(0) ? name.charAt(0).toUpperCase() : '?'}
					</p>
				</div>
			{/if}
		</div>
		<p class="text-xs text-neutral-600 dark:text-neutral-400">{description}</p>
		<div class="flex-1"></div>
		{#if externalLink}
			<button class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
				<a href={externalLink}>Visit Website</a>
			</button>
		{/if}
	</div>
</div>
