<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Project {
		name: string;
		description: string;
		externalLink?: string;
		image?: string;
		techStack: string[];
		category?: string;
		size?: 'small' | 'medium' | 'large';
	}

	export let projects: Project[] = [];

	let expandedIndex: number | null = null;

	function expandProject(index: number) {
		expandedIndex = index;
		document.body.style.overflow = 'hidden';
	}

	function closeExpanded() {
		expandedIndex = null;
		document.body.style.overflow = '';
	}

	// Grid size classes based on project size
	function getGridClass(size?: string) {
		switch (size) {
			case 'large':
				return 'md:col-span-2 md:row-span-2';
			case 'medium':
				return 'md:col-span-2';
			default:
				return 'md:col-span-1';
		}
	}

	// Theme colors
	const themes = [
		{
			border: 'border-cyan-500/30',
			bg: 'from-cyan-950/40',
			glow: 'shadow-[0_0_25px_rgba(6,182,212,0.4)]',
			text: 'text-cyan-400'
		},
		{
			border: 'border-purple-500/30',
			bg: 'from-purple-950/40',
			glow: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]',
			text: 'text-purple-400'
		},
		{
			border: 'border-pink-500/30',
			bg: 'from-pink-950/40',
			glow: 'shadow-[0_0_25px_rgba(236,72,153,0.4)]',
			text: 'text-pink-400'
		},
		{
			border: 'border-blue-500/30',
			bg: 'from-blue-950/40',
			glow: 'shadow-[0_0_25px_rgba(59,130,246,0.4)]',
			text: 'text-blue-400'
		}
	];
</script>

<!-- Grid Layout -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
	{#each projects as project, index}
		{@const theme = themes[index % themes.length]}
		<button
			on:click={() => expandProject(index)}
			class="group relative overflow-hidden rounded-xl border {theme.border} bg-gradient-to-br {theme.bg} via-transparent to-black/40 p-6 text-left backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:{theme.glow} {getGridClass(
				project.size
			)}"
			style="min-height: 200px;"
		>
			<!-- Background Image -->
			{#if project.image}
				<div class="absolute inset-0 z-0">
					<img
						src={project.image}
						alt={project.name}
						class="h-full w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
					></div>
				</div>
			{/if}

			<!-- Content -->
			<div class="relative z-10 flex h-full flex-col justify-end">
				<div
					class="mb-2 inline-block w-fit rounded-full border {theme.border} bg-black/40 px-3 py-1 backdrop-blur-sm"
				>
					<span class="font-mono text-xs font-medium {theme.text}">
						{project.category || 'Project'}
					</span>
				</div>

				<h3
					class="mb-2 font-mono text-xl font-bold text-white transition-colors duration-300 group-hover:{theme.text}"
				>
					{project.name}
				</h3>

				<div
					class="h-1 w-12 bg-gradient-to-r {theme.bg} rounded-full to-transparent transition-all duration-500 group-hover:w-24"
				></div>

				<p class="mt-3 line-clamp-2 text-sm text-cyan-100/60">
					{project.description}
				</p>

				<!-- Expand indicator -->
				<div
					class="absolute top-4 right-4 rounded-full border {theme.border} bg-black/40 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
				>
					<svg class="h-4 w-4 {theme.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
						/>
					</svg>
				</div>
			</div>

			<!-- Shimmer effect -->
			<div
				class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style="background: linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent); animation: shimmer 2s infinite;"
			></div>
		</button>
	{/each}
</div>

<!-- Expanded Modal -->
{#if expandedIndex !== null}
	{@const project = projects[expandedIndex]}
	{@const theme = themes[expandedIndex % themes.length]}

	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
		transition:fade={{ duration: 300 }}
	>
		<!-- Backdrop -->
		<button
			on:click={closeExpanded}
			class="absolute inset-0 bg-black/90 backdrop-blur-md"
			aria-label="Close"
		></button>

		<!-- Modal Content -->
		<div
			class="relative z-10 flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border {theme.border} bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl {theme.glow}"
			transition:fly={{ y: 50, duration: 400, easing: cubicOut }}
		>
			<!-- Close Button -->
			<button
				on:click={closeExpanded}
				class="absolute top-4 right-4 z-20 rounded-full border {theme.border} bg-black/60 p-2 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:{theme.glow}"
			>
				<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Content Wrapper with Scroll -->
			<div class="flex-1 overflow-y-auto">
				<!-- Image Section -->
				{#if project.image}
					<div class="relative h-64 overflow-hidden sm:h-80">
						<img src={project.image} alt={project.name} class="h-full w-full object-cover" />
						<div
							class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
						></div>
					</div>
				{/if}

				<!-- Details Section -->
				<div class="p-6 sm:p-8">
					<!-- Category Badge -->
					<div
						class="mb-4 inline-block rounded-full border {theme.border} bg-black/40 px-4 py-1.5 backdrop-blur-sm"
					>
						<span class="font-mono text-sm font-medium {theme.text}">
							{project.category || 'Project'}
						</span>
					</div>

					<!-- Title -->
					<h2 class="mb-4 font-mono text-3xl font-bold text-white sm:text-4xl">
						{project.name}
					</h2>

					<div class="mb-6 h-1 w-24 bg-gradient-to-r {theme.bg} rounded-full to-transparent"></div>

					<!-- Description -->
					<p class="mb-8 text-base leading-relaxed text-cyan-100/80 sm:text-lg">
						{project.description}
					</p>

					<!-- Tech Stack -->
					{#if project.techStack.length > 0}
						<div class="mb-8">
							<h3
								class="mb-4 font-mono text-sm font-semibold tracking-wider uppercase {theme.text}"
							>
								Tech Stack
							</h3>
							<div class="flex flex-wrap gap-2">
								{#each project.techStack as tech}
									<span
										class="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-950/40 px-4 py-2 font-mono text-sm font-medium text-cyan-300 backdrop-blur-sm"
									>
										<span class="h-2 w-2 rounded-full bg-cyan-400"></span>
										{tech}
									</span>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Action Button -->
					{#if project.externalLink}
						<a
							href={project.externalLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-3 rounded-lg border {theme.border} bg-black/60 px-6 py-3 font-mono text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:{theme.glow} hover:bg-black/80"
						>
							<span>View Project</span>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
