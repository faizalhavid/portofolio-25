<script lang="ts">
	import ClientsCard from '$lib/components/cards/ClientCard.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import ProjectGallery from '$lib/components/ProjectGallery.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import WorkTimeline from '$lib/components/WorkTimeline.svelte';
	import { loadJsonArray } from '$lib/utils/load-json.js';
	import Marquee from 'svelte-fast-marquee';
	import { onMount } from 'svelte';
	import PatternBackground from '$lib/components/PatternBackground.svelte';
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import SkillsBubble from '$lib/components/SkillsBubble.svelte';

	// @ts-ignore
	let experience: any[] | null | undefined = [];
	let mount = false;
	let activeSection = '';
	const sectionIds = ['overview', 'skills', 'client'];

	let slidePerPage = 3;
	let currentBreakPoint = 'desktop';
	const fs = {
		'/': {
			type: 'dir',
			children: {
				'soft-dev': {
					type: 'dir',
					children: {
						'nodejs.txt': { type: 'file', content: 'Node.js' },
						'express.txt': { type: 'file', content: 'Express' },
						'postgresql.txt': { type: 'file', content: 'PostgreSQL' },
						'svelte.txt': { type: 'file', content: 'Svelte' },
						'tailwindcss.txt': { type: 'file', content: 'Tailwind CSS' },
						'vite.txt': { type: 'file', content: 'Vite' }
					}
				},
				'creative-visual': {
					type: 'dir',
					children: {
						'figma.txt': { type: 'file', content: 'Figma' },
						'adobexd.txt': { type: 'file', content: 'Adobe XD' },
						'photoshop.txt': { type: 'file', content: 'Photoshop' },
						'illustrator.txt': { type: 'file', content: 'Illustrator' }
					}
				}
			}
		}
	};

	let terminalHandleCommand: ((cmd: string) => void) | null = null;

	function handleOnMountTerminal(handleCommand: (cmd: string) => void) {
		terminalHandleCommand = handleCommand;
	}

	$: if (activeSection === 'skills' && terminalHandleCommand) {
		['cd soft-dev && ls -a', 'cd .. && cd creative-visual && ls -a'].forEach((cmd) =>
			terminalHandleCommand!(cmd)
		);
	}

	function updateBreakpoint() {
		if (window.matchMedia('(max-width: 640px)').matches) {
			slidePerPage = 1;
			currentBreakPoint = 'mobile';
		} else if (window.matchMedia('(max-width: 1024px)').matches) {
			slidePerPage = 2;
			currentBreakPoint = 'tablet';
		} else {
			slidePerPage = 3;
			currentBreakPoint = 'desktop';
		}
		// Make it reactive
		// $: currentBreakPoint;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
						// // Make it reactive
						$: activeSection;
					}
				});
			},
			{
				threshold: 1
			}
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});

	$: console.log('active section:', activeSection);
	$: console.log('current breakpoint:', currentBreakPoint);

	onMount(() => {
		updateBreakpoint();
		window.addEventListener('resize', updateBreakpoint);
		return () => window.removeEventListener('resize', updateBreakpoint);
	});

	onMount(async () => {
		experience = await loadJsonArray('/jsons/experience.json');
		mount = true;
		console.log(experience);
	});

	// Projects data
	const projectsData = [
		{
			name: 'E-Commerce Platform',
			description:
				'A full-featured e-commerce platform with real-time inventory, payment integration, and advanced analytics dashboard.',
			externalLink: 'https://example.com',
			image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1470',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
			category: 'Full-Stack',
			size: 'large'
		},
		{
			name: 'AI Chat Assistant',
			description:
				'Intelligent chatbot powered by machine learning for customer support automation.',
			externalLink: 'https://example.com',
			image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1470',
			techStack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
			category: 'AI/ML',
			size: 'small'
		},
		{
			name: 'Task Manager Pro',
			description: 'Collaborative task management tool with real-time updates and team analytics.',
			externalLink: 'https://example.com',
			techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
			category: 'Web App',
			size: 'small'
		},
		{
			name: 'Portfolio CMS',
			description: 'Headless CMS for managing portfolio content with a beautiful admin interface.',
			externalLink: 'https://example.com',
			image: 'https://images.unsplash.com/photo-1753248845864-878296d03789?q=80&w=1470',
			techStack: ['Svelte', 'SvelteKit', 'Supabase'],
			category: 'CMS',
			size: 'small'
		},
		{
			name: 'Mobile Fitness App',
			description: 'Cross-platform fitness tracking app with workout plans and nutrition guidance.',
			externalLink: 'https://example.com',
			techStack: ['React Native', 'Expo', 'MongoDB', 'Express'],
			category: 'Mobile',
			size: 'medium'
		},
		{
			name: 'DevOps Dashboard',
			description:
				'Real-time monitoring dashboard for cloud infrastructure and deployment pipelines.',
			externalLink: 'https://example.com',
			techStack: ['Next.js', 'Docker', 'Kubernetes', 'Grafana'],
			category: 'DevOps',
			size: 'small'
		}
	];

	// Skills data
	const skillsData = [
		// Languages (Cyan)
		{ name: 'JavaScript', size: 'xl', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'TypeScript', size: 'xl', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'Python', size: 'lg', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'Java', size: 'md', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'PHP', size: 'md', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'C#', size: 'sm', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'Go', size: 'sm', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'SQL', size: 'md', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'HTML', size: 'lg', color: 'rgb(6,182,212)', category: 'Languages' },
		{ name: 'CSS', size: 'lg', color: 'rgb(6,182,212)', category: 'Languages' },

		// Frameworks (Purple)
		{ name: 'React', size: 'xl', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Vue.js', size: 'lg', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Svelte', size: 'lg', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Next.js', size: 'md', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Node.js', size: 'xl', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Express', size: 'md', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'NestJS', size: 'sm', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Django', size: 'md', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Flask', size: 'sm', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Spring Boot', size: 'sm', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Laravel', size: 'md', color: 'rgb(168,85,247)', category: 'Frameworks' },
		{ name: 'Tailwind CSS', size: 'lg', color: 'rgb(168,85,247)', category: 'Frameworks' },

		// Tools (Blue)
		{ name: 'Git', size: 'lg', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'VS Code', size: 'md', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'Postman', size: 'md', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'Webpack', size: 'sm', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'Vite', size: 'md', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'npm', size: 'sm', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'REST API', size: 'lg', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'GraphQL', size: 'md', color: 'rgb(59,130,246)', category: 'Tools' },
		{ name: 'Prisma', size: 'sm', color: 'rgb(59,130,246)', category: 'Tools' },

		// Design (Pink)
		{ name: 'Figma', size: 'lg', color: 'rgb(236,72,153)', category: 'Design' },
		{ name: 'Adobe XD', size: 'md', color: 'rgb(236,72,153)', category: 'Design' },
		{ name: 'Photoshop', size: 'md', color: 'rgb(236,72,153)', category: 'Design' },
		{ name: 'Illustrator', size: 'sm', color: 'rgb(236,72,153)', category: 'Design' },
		{ name: 'Sketch', size: 'sm', color: 'rgb(236,72,153)', category: 'Design' },
		{ name: 'UI/UX', size: 'lg', color: 'rgb(236,72,153)', category: 'Design' },

		// DevOps (Green)
		{ name: 'Docker', size: 'lg', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'Kubernetes', size: 'md', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'AWS', size: 'lg', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'Azure', size: 'sm', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'CI/CD', size: 'md', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'Jenkins', size: 'sm', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'Nginx', size: 'sm', color: 'rgb(34,197,94)', category: 'DevOps' },
		{ name: 'Linux', size: 'md', color: 'rgb(34,197,94)', category: 'DevOps' }
	];
</script>

<div class="bg relative flex max-h-[100vh] min-h-0 flex-col overflow-y-clip">
	<!-- title -->
	<div class="z-10 flex flex-col gap-8 px-6 pt-[12rem] sm:px-12 lg:px-25">
		<div class="mx-auto w-full max-w-5xl">
			<div class="mx-auto w-fit">
				<p
					class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-6xl font-medium text-transparent"
				>
					CodeIt-deployIt
				</p>
				<p
					class="mt-4 ml-40 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-6xl font-medium text-transparent"
				>
					DesignIt-renderIt
				</p>
			</div>
			<p class="mt-6 max-w-2xl text-center text-sm text-cyan-300/70 sm:text-base lg:text-lg">
				Full-stack developer & creative designer crafting digital experiences
			</p>
		</div>

		<div class="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
			{#each experience as exp}
				<div
					class="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-purple-950/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
				>
					<div class="flex flex-col gap-2">
						<p class="text-xs font-medium tracking-wider text-cyan-400/70 uppercase sm:text-sm">
							{exp.name}
						</p>
						<p class="text-xl font-bold text-cyan-100 sm:text-2xl">
							{exp.years}<span class="text-base font-normal text-green-400">+</span>
						</p>
						<p class="text-xs text-green-400">years experience</p>
					</div>
					<div
						class="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</div>
			{/each}
		</div>
	</div>
	{#if mount}
		<PatternBackground className="z-0 top-0 left-0 absolute w-full h-full" />
	{/if}
	<!-- image -->
	<div class="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen flex-grow">
		<img src="/images/main-banner.jpg" alt="Main Banner" class="h-full w-full object-cover" />
		<div
			class="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-primary-900 to-primary-900/0"
		></div>
	</div>
</div>

<div class="box-border flex min-h-0 w-full max-w-[100vw] flex-row gap-8 overflow-x-auto">
	<div
		class="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"
	></div>
	<div class="mt-15 flex w-full min-w-0 flex-col gap-10">
		<div id="overview" class="mb-8 flex flex-col gap-10 overflow-hidden px-2 sm:px-4 md:px-8">
			<p class="text-path text-cyan-400">~/../overview</p>
			<!-- <Divider /> -->
			<div class="flex h-auto flex-col items-center justify-center gap-4 md:h-[40vh] md:flex-row">
				<div class="flex h-[200px] w-full md:h-full md:w-1/2">
					<img
						src="/images/overview-illustration.png"
						alt="Overview Illustration"
						class="h-full w-full [mask-image:linear-gradient(to_bottom,var(--color-primary-900)_0%,transparent)] object-cover"
						style="object-position: right 10%;"
					/>
				</div>

				<div class="mt-4 w-full text-justify text-xs text-white/70 md:mt-0 md:w-1/2">
					<p class="mb-2 text-lg md:text-xl">
						Hi, <span class="text-highlight">I'm Zhall </span>
					</p>
					<!-- <span class="text-3xl font-bold">"</span> -->
					— a passionate
					<span class="text-highlight">Application Developer</span>
					with over a year of professional experience in building
					<span class="text-highlight">web, mobile, and backend solutions</span>. I specialize in
					<span class="text-highlight">full-stack development</span>,
					<span class="text-highlight">API integration</span>, and
					<span class="text-highlight">UI/UX design</span>, with a growing foundation in
					<span class="text-highlight">DevOps</span> and
					<span class="text-highlight">cloud deployment</span>. I enjoy turning complex ideas into
					<span class="text-highlight">reliable, scalable software</span>
					that supports real
					<span class="text-highlight">business goals</span>. Always eager to
					<span class="text-highlight">learn and grow</span>, I’m constantly exploring
					<span class="text-highlight">new technologies</span>
					and better ways to build
					<span class="text-highlight">impactful digital experiences</span>.
					<!-- <span class="text-3xl font-bold">"</span> -->
				</div>
			</div>
			<!-- <Carousel autoplay={2000} perPage={slidePerPage} className="h-100">
				<div class="h-60 w-full flex-1 bg-primary-200 md:w-[250px]"></div>
				<div class="h-60 w-full flex-1 bg-primary-200 md:w-[250px]"></div>
				<div class="h-60 w-full flex-1 bg-primary-200 md:w-[250px]"></div>
				<div class="h-60 w-full flex-1 bg-primary-200 md:w-[250px]"></div>
				<span class="display:inline;margin-top:6rem;" slot="left-control">Left</span>
				<span class="display:inline;margin-top:6rem;" slot="right-control">Right</span>
			</Carousel> -->
		</div>

		<div id="skills" class="flex flex-col justify-between gap-2">
			<p class="text-path text-cyan-400">~/../skills</p>
			<div class="flex flex-col p-4">
				<SkillsBubble skills={skillsData} />
			</div>
		</div>

		<div class="mx-auto flex w-full flex-col gap-4">
			<p class="text-path text-cyan-400">../clients</p>
			<Carousel autoplay={2000} perPage={3}>
				<ClientsCard
					name="Client 1"
					description="Description for Client 1"
					externalLink="https://example.com"
					image="https://images.unsplash.com/photo-1753248845864-878296d03789?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				/>

				<ClientsCard
					name="Client 2"
					description="Description for Client 2"
					externalLink="https://example.com"
				/>

				<ClientsCard
					name="Client 3"
					description="Description for Client 3"
					externalLink="https://example.com"
				/>
				<ClientsCard
					name="Client 3"
					description="Description for Client 3"
					externalLink="https://example.com"
				/>
				<span class="display:inline;margin-top:6rem;" slot="left-control">Left</span>
				<span class="display:inline;margin-top:6rem;" slot="right-control">Right</span>
			</Carousel>
		</div>

		<div class="mx-auto flex w-full flex-col gap-6">
			<div class="flex items-center gap-3">
				<div class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
				<p class="text-path font-mono text-lg font-semibold text-cyan-400">~/../projects</p>
				<div class="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
			</div>
			<div
				class="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-purple-950/20 to-cyan-950/20 p-6 backdrop-blur-sm"
			>
				<ProjectGallery projects={projectsData} />
			</div>
		</div>

		<div class="mx-auto flex w-full flex-col gap-4">
			<p class="text-path">~/../clients</p>
			<Carousel autoplay={2000} perPage={3}>
				<ClientsCard
					name="Client 1"
					description="Description for Client 1"
					externalLink="https://example.com"
					image="https://images.unsplash.com/photo-1753248845864-878296d03789?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				/>

				<ClientsCard
					name="Client 2"
					description="Description for Client 2"
					externalLink="https://example.com"
				/>

				<ClientsCard
					name="Client 3"
					description="Description for Client 3"
					externalLink="https://example.com"
				/>
				<ClientsCard
					name="Client 3"
					description="Description for Client 3"
					externalLink="https://example.com"
				/>
				<span class="display:inline;margin-top:6rem;" slot="left-control">Left</span>
				<span class="display:inline;margin-top:6rem;" slot="right-control">Right</span>
			</Carousel>
		</div>
	</div>
</div>

<!-- end content -->

<div class="flex flex-col gap-4">
	<div class="flex flex-col">
		<h1 class="text-[5rem] font-medium">Work</h1>
		<WorkTimeline />
	</div>

	<div class="mx-auto flex w-full flex-col gap-4">
		<p class="text-path text-cyan-400">../Connect-with-me</p>
		<Marquee speed={20} gap="5px" pauseOnHover>
			<Chip
				text="email@mail.com"
				color="bg-cyan-500/20"
				textColor="text-cyan-300"
				className="mr-2 border border-cyan-500/30"
			/>
			<Chip
				text="github.com/username"
				color="bg-purple-500/20"
				textColor="text-purple-300"
				className="mr-2 border border-purple-500/30"
			/>
			<Chip
				text="linkedin.com/in/username"
				color="bg-blue-500/20"
				textColor="text-blue-300"
				className="mr-2 border border-blue-500/30"
			/>
			<Chip
				text="twitter.com/username"
				color="bg-cyan-500/20"
				textColor="text-cyan-300"
				className="mr-2 border border-cyan-500/30"
			/>
			<Chip
				text="email@mail.com"
				color="bg-cyan-500/20"
				textColor="text-cyan-300"
				className="mr-2 border border-cyan-500/30"
			/>
			<Chip
				text="github.com/username"
				color="bg-purple-500/20"
				textColor="text-purple-300"
				className="mr-2 border border-purple-500/30"
			/>
			<Chip
				text="linkedin.com/in/username"
				color="bg-blue-500/20"
				textColor="text-blue-300"
				className="mr-2 border border-blue-500/30"
			/>
			<Chip
				text="twitter.com/username"
				color="bg-cyan-500/20"
				textColor="text-cyan-300"
				className="mr-2 border border-cyan-500/30"
			/>
		</Marquee>
	</div>
	<!-- footer -->
	<div
		class="relative right-1/2 left-1/2 z-0 mt-15 mr-[-50vw] ml-[-50vw] flex w-screen flex-col items-center justify-center gap-4 p-8 text-white"
		style="background: url('/images/footer-banner.jpg') top/cover no-repeat; height: calc(100vh - 400px);"
	>
		<!-- Remove the <img> tag, use only background -->
		<p class="text-lg">© 2023 Your Name. All rights reserved.</p>
		<p class="text-sm">Built with Svelte and Tailwind CSS</p>
		<p class="text-sm">Follow me on social media!</p>
		<div class="flex gap-4">
			<a href="aaaa" class="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
				>GitHub</a
			>
			<a href="aaaa" class="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
				>LinkedIn</a
			>
			<a href="aaaa" class="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
				>Twitter</a
			>
			<a href="aaaa" class="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
				>Instagram</a
			>
			<a href="aaaa" class="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
				>Facebook</a
			>
		</div>
	</div>
</div>

<style global>
	:global(body) {
		height: 100vh;
	}
	ul.svelte-fp-slide-indicator > li > button > i {
		background-color: #fff;
		border: 1px solid #000;
	}
</style>
