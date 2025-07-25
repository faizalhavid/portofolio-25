<script lang="ts">
	export let text: string;
	export let color: string = 'bg-gray-200';
	export let textColor: string = 'text-gray-700';
	export let className: string = '';
	export let variant: 'contained' | 'outline' = 'contained';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let onClick: () => void = () => {};

	// Size classes
	$: sizeClass =
		size === 'small'
			? 'px-2 py-0.5 text-xs'
			: size === 'large'
				? 'px-4 py-2 text-base'
				: 'px-3 py-1 text-sm';

	// Variant classes
	$: variantClass =
		variant === 'outline'
			? `bg-transparent border ${color.replace('bg-', 'border-')} ${textColor}`
			: `${color} ${textColor}`;
</script>

<button
	type="button"
	class={`inline-block rounded-full font-medium ${sizeClass} ${variantClass} dark:bg-gray-800 dark:text-gray-300 ${className}`}
	on:click={onClick}
	style="cursor: pointer;"
>
	{text}
</button>
