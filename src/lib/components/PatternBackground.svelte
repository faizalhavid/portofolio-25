<script lang="ts">
	export let className = '';
	const colorScheme = [
		'var(--color-primary-900)', // darkest (low)
		'var(--color-primary-800)',
		'var(--color-primary-700)',
		'var(--color-primary-600)',
		'var(--color-primary-700)',
		'var(--color-primary-800)',
		'var(--color-primary-900)' // darkest (low)
	];

	const columnCount = 8;
	let boxCount = 0;
	let columns: string[][] = [];
	let intervals: any[] = [];

	function generateColumns() {
		boxCount = Math.ceil(window.innerHeight / 16);
		columns = Array.from({ length: columnCount }, (_, colIdx) => {
			return Array.from({ length: boxCount }, (_, boxIdx) => {
				const colorIdx = (boxIdx + colIdx * 2) % colorScheme.length;
				return colorScheme[colorIdx];
			});
		});
	}

	function startAnimation() {
		stopAnimation();
		intervals = columns.map((_, colIdx) =>
			setInterval(() => {
				const direction = colIdx % 2 === 0 ? 1 : -1;
				columns[colIdx] = shiftArray(columns[colIdx], direction);
				columns = [...columns];
			}, 200)
		);
	}

	function stopAnimation() {
		intervals.forEach(clearInterval);
		intervals = [];
	}

	function shiftArray(arr: string[], direction: number) {
		const copy = [...arr];
		if (direction > 0) {
			copy.unshift(copy.pop()!);
		} else {
			copy.push(copy.shift()!);
		}
		return copy;
	}

	function handleResize() {
		generateColumns();
		startAnimation();
	}

	import { onMount, onDestroy } from 'svelte';
	onMount(() => {
		generateColumns();
		startAnimation();
		window.addEventListener('resize', handleResize);
	});
	onDestroy(() => {
		stopAnimation();
		window.removeEventListener('resize', handleResize);
	});
</script>

<div
	class={`wrapper pattern-bg right-1/2 left-1/2 mt-16 mr-[-50vw] ml-[-50vw] h-[50vh] w-screen bg-center opacity-50 ${className}`}
	id="wrapper"
>
	<div
		class="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-900/5 to-primary-900 shadow-[inset_0_-16px_32px_-8px_var(--color--900)]"
	></div>
	<!-- Pattern as background -->
	{#each columns as boxes (boxes)}
		<div class="column">
			{#each boxes as color, i (i)}
				<div class="box" style="background-color: {color};"></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.pattern-bg {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 2px;
		pointer-events: none;
	}
	.column {
		display: grid;
		grid-template-rows: repeat(auto-fill, minmax(2rem, 1fr));
		gap: 2px;
	}
	.box {
		width: 100%;
		height: 100%;
		transition: background-color 0.3s ease;
	}
</style>
