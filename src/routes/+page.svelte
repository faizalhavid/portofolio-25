<script lang="ts">
	import ClientsCard from '$lib/components/cards/ClientCard.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import WorkTimeline from '$lib/components/WorkTimeline.svelte';
	import { loadJsonArray } from '$lib/utils/load-json.js';
	import Marquee from 'svelte-fast-marquee';
	import { onMount } from 'svelte';
	import PatternBackground from '$lib/components/PatternBackground.svelte';
	import Terminal from '$lib/components/terminal/Terminal.svelte';

	import {
		type FullpageActivityStore,
		Fullpage,
		FullpageSection,
		FullpageSlide
	} from 'svelte-fullpage';
	// @ts-ignore
	let experience = [];
	let mount = false;

	let slidePerPage = 3;
	let currentBreakPoint = 'desktop';

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
	}
	let fullpageController: FullpageActivityStore;
	let sectionController: FullpageActivityStore;

	onMount(() => {
		updateBreakpoint();
		window.addEventListener('resize', updateBreakpoint);
		window.fullpageController = fullpageController;
		window.sectionController = sectionController;
		console.info(
			'Hey, you can access fullpage controller from console, try typing window.fullpageController or' +
				' simply fullpageController, same for sectionController, try calling on them .goto(index) for programmatic navigation.'
		);
		console.log('example: fullpageController.goto(2) will scroll to third section');
		return () => window.removeEventListener('resize', updateBreakpoint);
	});

	onMount(async () => {
		experience = await loadJsonArray('/jsons/experience.json');
		mount = true;
		console.log(experience);
	});
</script>

<Fullpage bind:controller={fullpageController}>
	<FullpageSection title="main">
		<div class="flex max-h-[100vh] min-h-0 flex-col overflow-y-clip">
			<!-- title -->
			<div class="z-10 flex flex-col gap-5 px-25 pt-[15rem]">
				<div class="mx-auto w-fit">
					<p class="text-6xl font-medium">CodeIt-deployIt</p>
					<p class="mt-4 ml-40 text-6xl font-medium">DesignIt-renderIt</p>
				</div>

				<div class="flex w-full flex-row justify-between">
					{#each experience as exp}
						<div class="flex flex-col gap-1">
							<p class="text-sm font-medium">{exp.name}</p>
							<p class="font-regular text-sm">
								{exp.years}+ <span class="text-green-500">years-exp</span>
							</p>
						</div>
					{/each}
				</div>
			</div>
			{#if mount}
				<PatternBackground className="z-0 top-0 absolute" />
			{/if}
			<!-- image -->
			<div class="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen flex-grow">
				<img src="/images/main-banner.jpg" alt="Main Banner" class="h-full w-full object-cover" />
				<div
					class="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-primary-900 to-primary-900/0"
				></div>
			</div>
		</div>
	</FullpageSection>

	<!-- <div class="box-border flex min-h-0 w-full max-w-[100vw] flex-row gap-4 overflow-x-auto"> -->
	<!-- <div
	class="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"
></div> -->

	<!-- <div class="mt-15 flex w-full flex-col gap-8"> -->
	<!-- overview -->
	<FullpageSection title="overview">
		<div class="mb-8 flex flex-col gap-10 overflow-hidden px-2 sm:px-4 md:px-8">
			<p class="text-path">~/../overview</p>
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
	</FullpageSection>
	<!-- skills -->
	<FullpageSection title="skills">
		<div class="flex flex-col justify-between gap-2">
			<p class="text-path">~/../skills</p>
			<div class="flex flex-col p-4">
				<Terminal user="zhal" host="portofolio" />

				<!-- <PromptContainer
					title="Creative-visual"
					className="my-4"
					command={['run ls -a creative-visual/']}
				> -->
				<!-- <div class="flex gap-2">
					<button class={`mr-1 rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../backend.bash
					</button>
					<button class={`mr-1 rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../frontend.bash
					</button>
					<button class={`rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../devops.bash
					</button>
				</div> -->
				<!-- <ul class="list-disc pl-5">
						<li>Skill 1</li>
						<li>Skill 2</li>
						<li>Skill 3</li>
					</ul>
				</PromptContainer> -->
			</div>
		</div>
	</FullpageSection>

	<!-- clients -->
	<FullpageSection title="clients">
		<div class="mx-auto flex w-full flex-col gap-4">
			<p class="text-path">../clients</p>
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
	</FullpageSection>

	<!-- projects -->
	<FullpageSection title="projects">
		<div class="mx-auto flex w-full flex-col gap-4">
			<p class="text-path">~/../Projects</p>
			<Carousel autoplay={0} perPage={3} rtl>
				<ProjectCard
					name="Project 1"
					description="Description for Project 1"
					externalLink="https://example.com"
					image="https://images.unsplash.com/photo-1753248845864-878296d03789?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					techStack={['HTML', 'CSS', 'JavaScript']}
				/>

				<ProjectCard
					name="Project 2"
					description="Description for Project 2"
					externalLink="https://example.com"
					techStack={['HTML', 'CSS', 'JavaScript']}
				/>

				<ProjectCard
					name="Project 3"
					description="Description for Project 3"
					externalLink="https://example.com"
					techStack={['HTML', 'CSS', 'JavaScript']}
				/>
				<ProjectCard
					name="Project 3"
					description="Description for Project 3"
					externalLink="https://example.com"
					techStack={['HTML', 'CSS', 'JavaScript']}
				/>
				<span class="display:inline;margin-top:6rem;" slot="left-control">Left</span>
				<span class="display:inline;margin-top:6rem;" slot="right-control">Right</span>
			</Carousel>
		</div>
	</FullpageSection>
	<!-- clients -->
	<FullpageSection title="clients">
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
	</FullpageSection>
	<!-- </div> -->
	<!-- </div> -->
</Fullpage>
<!-- end content -->

<div class="flex flex-col gap-4">
	<div class="flex flex-col">
		<h1 class="text-[5rem] font-medium">Work</h1>
		<WorkTimeline />
	</div>

	<div class="mx-auto flex w-full flex-col gap-4">
		<p class="text-path">../Connect-with-me</p>
		<Marquee speed={20} gap="5px" pauseOnHover>
			<Chip text="email@mail.com" color="bg-blue-200" textColor="text-blue-800" className="mr-2" />
			<Chip
				text="github.com/username"
				color="bg-gray-200"
				textColor="text-gray-700"
				className="mr-2"
			/>
			<Chip
				text="linkedin.com/in/username"
				color="bg-blue-200"
				textColor="text-blue-800"
				className="mr-2"
			/>
			<Chip
				text="twitter.com/username"
				color="bg-blue-200"
				textColor="text-blue-800"
				className="mr-2"
			/>
			<Chip text="email@mail.com" color="bg-blue-200" textColor="text-blue-800" className="mr-2" />
			<Chip
				text="github.com/username"
				color="bg-gray-200"
				textColor="text-gray-700"
				className="mr-2"
			/>
			<Chip
				text="linkedin.com/in/username"
				color="bg-blue-200"
				textColor="text-blue-800"
				className="mr-2"
			/>
			<Chip
				text="twitter.com/username"
				color="bg-blue-200"
				textColor="text-blue-800"
				className="mr-2"
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
			<a href="aaaa" class="text-blue-400 hover:underline">GitHub</a>
			<a href="aaaa" class="text-blue-400 hover:underline">LinkedIn</a>
			<a href="aaaa" class="text-blue-400 hover:underline">Twitter</a>
			<a href="aaaa" class="text-blue-400 hover:underline">Instagram</a>
			<a href="aaaa" class="text-blue-400 hover:underline">Facebook</a>
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
