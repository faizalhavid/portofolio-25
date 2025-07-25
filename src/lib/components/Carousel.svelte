<script lang="ts">
	// @ts-ignore
	import SiemaImport from 'siema';
	// Handles both default and named exports
	const Siema = (SiemaImport as any).default || SiemaImport;

	import { onMount, createEventDispatcher } from 'svelte';

	export let perPage = 3;
	export let loop = true;
	export let autoplay = 0;
	export let duration = 200;
	export let easing = 'ease-out';
	export let startIndex = 0;
	export let draggable = true;
	export let multipleDrag = true;
	export let dots = true;
	export let controls = true;
	export let threshold = 20;
	export let rtl = false;
	let currentIndex = startIndex;

	/**
	 * @type {HTMLDivElement}
	 */
	let siema: HTMLDivElement;
	/**
	 * @type {{ innerElements: string | any[]; perPage: any; destroy: () => void; prev: () => void; next: () => void; goTo: (arg0: any) => void; currentSlide: number; }}
	 */
	let controller: {
		innerElements: string | any[];
		perPage: any;
		destroy: () => void;
		prev: () => void;
		next: () => void;
		goTo: (arg0: any) => void;
		currentSlide: number;
	};
	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let timer: string | number | NodeJS.Timeout | undefined;
	const dispatch = createEventDispatcher();

	$: pips = controller ? controller.innerElements : [];
	$: currentPerPage = controller ? controller.perPage : perPage;
	$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : [];

	onMount(() => {
		controller = new Siema({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
			duration,
			easing,
			startIndex,
			draggable,
			multipleDrag,
			threshold,
			rtl,
			onChange: handleChange
		});

		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});

	/**
	 * @param {number} currentIndex
	 * @param {number} dotIndex
	 */
	export function isDotActive(currentIndex: number, dotIndex: number) {
		if (currentIndex < 0) currentIndex = pips.length + currentIndex;
		return (
			currentIndex >= dotIndex * currentPerPage &&
			currentIndex < dotIndex * currentPerPage + currentPerPage
		);
	}

	export function left() {
		controller.prev();
	}

	export function right() {
		controller.next();
	}

	/**
	 * @param {number} index
	 */
	export function go(index: number) {
		controller.goTo(index);
	}

	export function pause() {
		clearInterval(timer);
	}

	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	/**
	 * @param {any} event
	 */
	function handleChange(event: any) {
		currentIndex = controller.currentSlide;
		dispatch('change', {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		});
	}

	/**
	 * @param {HTMLButtonElement} node
	 * @param {number} condition
	 */
	function resetInterval(node: HTMLButtonElement, condition: number) {
		/**
		 * @param {any} event
		 */
		function handleReset(event: any) {
			pause();
			resume();
		}

		if (condition) {
			node.addEventListener('click', handleReset);
		}

		return {
			destroy() {
				node.removeEventListener('click', handleReset);
			}
		};
	}
</script>

<div class="carousel">
	<div class="mask mask-left"></div>
	<div class="mask mask-right"></div>
	<div class="slides" bind:this={siema}>
		<slot></slot>
	</div>
	{#if controls}
		<button class="left" on:click={left} use:resetInterval={autoplay} aria-label="left">
			<slot name="left-control"></slot>
		</button>
		<button class="right" on:click={right} use:resetInterval={autoplay} aria-label="right">
			<slot name="right-control"></slot>
		</button>
	{/if}
	{#if dots}
		<ul>
			{#each Array(Number(totalDots) || 0).fill(0) as _, i}
				<li>
					<button
						type="button"
						class={isDotActive(currentIndex, i) ? 'active' : ''}
						on:click={() => go(i * currentPerPage)}
						aria-label={`Go to slide ${i + 1}`}
					></button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	button {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		z-index: 50;
		margin-top: -20px;
		border: none;
		background-color: transparent;
	}
	button:focus {
		outline: none;
	}

	.left {
		left: 2vw;
	}

	.right {
		right: 2vw;
	}
	ul {
		list-style-type: none;
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -30px;
		padding: 0;
	}
	ul li {
		margin: 6px;
		border-radius: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		height: 8px;
		width: 8px;
	}
	ul li:hover {
		background-color: rgba(255, 255, 255, 0.85);
	}
	ul li.active {
		background-color: rgba(255, 255, 255, 1);
	}
	/* .carousel {
		position: relative;
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
	} */

	.mask {
		position: absolute;
		top: 0;
		width: 160px;
		height: 100%;
		z-index: 9;
		pointer-events: none;
	}

	.mask-left {
		left: 0;
		background: linear-gradient(to right, #111827 25%, transparent 100%);
	}

	.mask-right {
		right: 0;
		background: linear-gradient(to left, #111827 25%, transparent 100%);
	}

	/*

	.left,
	.right {
		position: absolute;
		top: 45%;
		transform: translateY(-50%);
		z-index: 20;
	}

	.left {
		left: 10rem; 
	}

	.right {
		right: 10rem; 
	}

	 */
</style>
