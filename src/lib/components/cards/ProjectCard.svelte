<script lang="ts">
	import Marquee from 'svelte-fast-marquee';

	export let name: string = '';
	export let description: string = '';
	export let externalLink: string = '';
	export let avatar: string = '';
	export let image: string = '';
	export let techStack: string[] = [];

	// Assign random theme color for variety
	const themes = [
		{
			border: 'border-cyan-500/30',
			bg: 'from-cyan-950/40',
			glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]',
			text: 'text-cyan-400'
		},
		{
			border: 'border-purple-500/30',
			bg: 'from-purple-950/40',
			glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]',
			text: 'text-purple-400'
		},
		{
			border: 'border-pink-500/30',
			bg: 'from-pink-950/40',
			glow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]',
			text: 'text-pink-400'
		},
		{
			border: 'border-blue-500/30',
			bg: 'from-blue-950/40',
			glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]',
			text: 'text-blue-400'
		}
	];
	const theme = themes[Math.floor(Math.random() * themes.length)];
</script>

<div
	class="group relative mx-2 flex h-[450px] w-full flex-col overflow-hidden rounded-2xl border {theme.border} bg-gradient-to-br {theme.bg} hover:border-opacity-80 via-transparent to-black/40 backdrop-blur-sm transition-all duration-500 {theme.glow} hover:-translate-y-2"
>
	<!-- Background Image with Overlay -->
	{#if image}
		<div class="absolute inset-0 z-0">
			<img
				src={image}
				alt={name}
				class="h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-60"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
		</div>
	{:else}
		<div
			class="absolute inset-0 z-0 bg-gradient-to-br from-cyan-950/20 via-purple-950/20 to-transparent"
		></div>
	{/if}

	<!-- Decorative corner accent -->
	<div
		class="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl {theme.bg} to-transparent opacity-50"
	></div>

	<!-- Content -->
	<div class="relative z-10 flex h-full flex-col p-6">
		<!-- Header -->
		<div class="flex flex-row items-start justify-between gap-3">
			<div class="flex-1">
				<h3
					class="mb-2 font-mono text-xl font-bold text-white transition-colors duration-300 group-hover:{theme.text}"
				>
					{name}
				</h3>
				<div
					class="h-1 w-16 bg-gradient-to-r {theme.bg} rounded-full to-transparent transition-all duration-500 group-hover:w-24"
				></div>
			</div>
			{#if avatar}
				<div
					class="overflow-hidden rounded-lg border-2 {theme.border} shadow-lg transition-transform duration-300 group-hover:scale-110"
				>
					<img src={avatar} alt={name} class="h-14 w-14 object-cover" />
				</div>
			{:else}
				<div
					class="flex h-14 w-14 items-center justify-center rounded-lg border-2 {theme.border} bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-black/60"
				>
					<p class="font-mono text-2xl font-bold {theme.text}">
						{name.charAt(0) ? name.charAt(0).toUpperCase() : '?'}
					</p>
				</div>
			{/if}
		</div>

		<!-- Description -->
		<p
			class="mt-4 text-sm leading-relaxed text-cyan-100/80 transition-colors duration-300 group-hover:text-cyan-50"
		>
			{description}
		</p>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Tech Stack -->
		{#if techStack.length > 0}
			<div
				class="mb-4 overflow-hidden rounded-xl border {theme.border} bg-black/30 p-3 backdrop-blur-sm"
			>
				<p class="mb-2 font-mono text-xs font-semibold tracking-wider uppercase {theme.text}">
					Tech Stack
				</p>
				<Marquee speed={25} gap="8px" pauseOnHover>
					{#each techStack as tech}
						<span
							class="inline-flex items-center gap-1 rounded-lg border border-cyan-400/30 bg-cyan-950/40 px-3 py-1.5 font-mono text-xs font-medium text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-950/60"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
							{tech}
						</span>
					{/each}
				</Marquee>
			</div>
		{/if}

		<!-- Action Button -->
		{#if externalLink}
			<a
				href={externalLink}
				target="_blank"
				rel="noopener noreferrer"
				class="group/btn flex items-center justify-center gap-2 rounded-lg border {theme.border} bg-black/40 px-4 py-3 font-mono text-sm font-semibold {theme.text} hover:border-opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 {theme.glow}"
			>
				<span>View Project</span>
				<span class="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
			</a>
		{/if}
	</div>

	<!-- Animated border effect -->
	<div
		class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
		style="background: linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent); animation: shimmer 2s infinite;"
	></div>
</div>

<style>
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
