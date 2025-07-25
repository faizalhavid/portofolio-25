<script lang="ts">
	export let height: string = 'auto';
	export let width: string = 'auto';
	export let color: string = 'bg-neutral-100/20';
	export let className: string = '';
	export let direction: 'vertical' | 'horizontal' = 'vertical';
	export let thickness: string = direction === 'vertical' ? '0.25rem' : '0.125rem';
</script>

<div
	class={`inline-block ${direction === 'vertical' ? 'self-stretch' : ''} ${color} ${className}`}
	style={`height: ${direction === 'vertical' ? height : thickness}; width: ${direction === 'vertical' ? thickness : width};`}
></div>
