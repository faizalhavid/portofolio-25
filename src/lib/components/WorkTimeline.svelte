<script>
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let workExperience = [
		{
			year: '2023 - Present',
			role: 'Senior Full-Stack Developer',
			company: 'Tech Corp',
			description: 'Leading development of scalable web applications using modern frameworks',
			skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
			color: 'cyan'
		},
		{
			year: '2021 - 2023',
			role: 'Full-Stack Developer',
			company: 'Digital Agency',
			description: 'Built responsive web applications and REST APIs for enterprise clients',
			skills: ['Vue.js', 'Express', 'MongoDB', 'Docker'],
			color: 'purple'
		},
		{
			year: '2020 - 2021',
			role: 'Frontend Developer',
			company: 'StartUp Inc',
			description: 'Developed user interfaces and improved application performance',
			skills: ['JavaScript', 'CSS', 'HTML', 'Git'],
			color: 'blue'
		},
		{
			year: '2019 - 2020',
			role: 'Junior Developer',
			company: 'Code Academy',
			description: 'Learned and contributed to various web development projects',
			skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
			color: 'cyan'
		}
	];

	let activeIndex = 0;
	let isPaused = false;

	onMount(() => {
		const interval = setInterval(() => {
			if (!isPaused) {
				activeIndex = (activeIndex + 1) % workExperience.length;
			}
		}, 4000);

		return () => clearInterval(interval);
	});

	function setActive(index) {
		activeIndex = index;
		isPaused = true;
		setTimeout(() => (isPaused = false), 8000);
	}

	function getColorClasses(color) {
		const colors = {
			cyan: {
				border: 'border-cyan-500/40',
				bg: 'bg-cyan-950/30',
				text: 'text-cyan-400',
				glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
				activeBorder: 'border-cyan-400/80',
				activeBg: 'bg-cyan-500/20',
				dotBg: 'bg-cyan-400'
			},
			purple: {
				border: 'border-purple-500/40',
				bg: 'bg-purple-950/30',
				text: 'text-purple-400',
				glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
				activeBorder: 'border-purple-400/80',
				activeBg: 'bg-purple-500/20',
				dotBg: 'bg-purple-400'
			},
			blue: {
				border: 'border-blue-500/40',
				bg: 'bg-blue-950/30',
				text: 'text-blue-400',
				glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
				activeBorder: 'border-blue-400/80',
				activeBg: 'bg-blue-500/20',
				dotBg: 'bg-blue-400'
			}
		};
		return colors[color] || colors.cyan;
	}
</script>

<div class="relative mx-auto w-full max-w-6xl">
	<!-- Header -->
	<div class="mb-12 flex items-center gap-3">
		<div class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
		<h2 class="font-mono text-2xl font-bold text-cyan-400">Work Experience</h2>
		<div class="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
	</div>

	<!-- Timeline Container -->
	<div class="relative">
		<!-- Vertical line (hidden on mobile) -->
		<div
			class="absolute top-0 left-8 hidden h-full w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 md:block"
		></div>

		<!-- Timeline Items -->
		<div class="space-y-8">
			{#each workExperience as experience, i}
				{@const colorClasses = getColorClasses(experience.color)}
				<div
					class="group relative cursor-pointer"
					on:click={() => setActive(i)}
					on:keydown={(e) => e.key === 'Enter' && setActive(i)}
					role="button"
					tabindex="0"
					in:fly={{ y: 50, duration: 500, delay: i * 100, easing: cubicOut }}
				>
					<!-- Timeline dot (hidden on mobile) -->
					<div class="absolute top-6 left-8 z-10 hidden -translate-x-1/2 md:block">
						<div
							class="relative h-4 w-4 rounded-full border-2 {colorClasses.dotBg} {i === activeIndex
								? 'scale-150 border-white'
								: 'scale-100 border-transparent'} transition-all duration-500"
						>
							{#if i === activeIndex}
								<div
									class="absolute inset-0 rounded-full {colorClasses.dotBg} animate-ping opacity-75"
								></div>
							{/if}
						</div>
					</div>

					<!-- Content Card -->
					<div class="md:ml-20">
						<div
							class="overflow-hidden rounded-2xl border {i === activeIndex
								? `${colorClasses.activeBorder} ${colorClasses.glow}`
								: colorClasses.border} bg-gradient-to-br {i === activeIndex
								? colorClasses.activeBg
								: colorClasses.bg} p-6 backdrop-blur-sm transition-all duration-500 hover:{colorClasses.glow}"
						>
							<!-- Year Badge -->
							<div
								class="mb-4 inline-block rounded-lg border {colorClasses.border} {colorClasses.bg} px-4 py-2"
							>
								<p class="font-mono text-sm font-semibold {colorClasses.text}">
									{experience.year}
								</p>
							</div>

							<!-- Role & Company -->
							<h3
								class="mb-2 text-2xl font-bold {colorClasses.text} transition-colors duration-300"
							>
								{experience.role}
							</h3>
							<p class="mb-4 text-lg font-medium text-white/60">
								@ {experience.company}
							</p>

							<!-- Description -->
							<p class="mb-6 leading-relaxed text-white/70">
								{experience.description}
							</p>

							<!-- Skills -->
							<div class="flex flex-wrap gap-2">
								{#each experience.skills as skill}
									<span
										class="rounded-lg border {colorClasses.border} {colorClasses.bg} px-3 py-1 font-mono text-xs font-medium {colorClasses.text} transition-all duration-300 hover:scale-105 hover:{colorClasses.glow}"
									>
										{skill}
									</span>
								{/each}
							</div>

							<!-- Progress indicator -->
							{#if i === activeIndex}
								<div class="mt-6">
									<div class="h-1 w-full overflow-hidden rounded-full bg-white/10">
										<div
											class="h-full {colorClasses.dotBg} animate-progress"
											style="animation-duration: 4000ms;"
										></div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Navigation dots -->
	<div class="mt-12 flex justify-center gap-3">
		{#each workExperience as experience, i}
			{@const colorClasses = getColorClasses(experience.color)}
			<button
				on:click={() => setActive(i)}
				class="group relative h-3 w-3 rounded-full transition-all duration-300 {i === activeIndex
					? `${colorClasses.dotBg} scale-125`
					: 'scale-100 bg-white/20 hover:bg-white/40'}"
				aria-label="Go to experience {i + 1}"
			>
				{#if i === activeIndex}
					<span class="absolute inset-0 rounded-full {colorClasses.dotBg} animate-ping opacity-75"
					></span>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	@keyframes progress {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	.animate-progress {
		animation: progress linear forwards;
	}
</style>
