<script lang="ts">
	export let title: string = '';
	export let className: string = '';
	export let mode: 'light' | 'dark' = 'light';
	export let command: string[] = [];

	$: bgMain = mode === 'dark' ? 'bg-primary-900' : 'bg-white';
	$: borderMain = mode === 'dark' ? 'border-primary-900' : 'border-neutral-200';
	$: headerBg = mode === 'dark' ? 'bg-primary-900' : 'bg-neutral-100';
	$: headerText = mode === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
	$: contentBg = mode === 'dark' ? 'bg-neutral-50' : 'bg-primary-900';
	$: contentBorder = mode === 'dark' ? 'border-primary-900' : 'border-neutral-200';
	$: slotText = mode === 'dark' ? 'text-neutral-100' : 'text-neutral-800';
</script>

<div
	class={`mx-auto w-full rounded-xl border ${borderMain} ${bgMain} shadow-lg ${className} card-hovering`}
	style="font-family: 'Fira Code', monospace;"
>
	<!-- Header bar -->
	<div
		class={`flex items-center justify-between rounded-t-xl border-b ${borderMain} ${headerBg} px-4 pb-2 pt-3`}
	>
		<span class={`text-xs tracking-tight ${headerText}`}>../skills/{title}</span>
		<div class="flex gap-2">
			<span class="bg-primary-900 h-3 w-3 rounded-full border"></span>
			<span class="bg-primary-900 h-3 w-3 rounded-full border"></span>
			<span class="bg-primary-900 h-3 w-3 rounded-full border"></span>
		</div>
	</div>
	<!-- Terminal content area -->
	<div
		class={`rounded-b-xl border-t ${contentBorder} ${contentBg} px-4 py-3 font-mono text-sm ${slotText}`}
	>
		{#each command as item, index}
			<p class="mb-2 text-xs italic text-neutral-400">{item}</p>
		{/each}
		<slot />
	</div>
</div>
