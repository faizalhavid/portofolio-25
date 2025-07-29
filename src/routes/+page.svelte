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

	// @ts-ignore
	let experience = [];
	let mount = false;

	onMount(async () => {
		experience = await loadJsonArray('/jsons/experience.json');
		mount = true;
		console.log(experience);
	});

	const cliData = [
		{
			name: 'backend',
			perms: 'drwxr-xr-x',
			count: 5,
			owner: 'user',
			group: 'group',
			size: 4096,
			date: 'Jul 27 12:00',
			path: '../backend.bash',
			stack: ['Node.js', 'Express', 'PostgreSQL'],
			cwd: '~/backend'
		},
		{
			name: 'frontend',
			perms: 'drwxr-xr-x',
			count: 3,
			owner: 'user',
			group: 'group',
			size: 4096,
			date: 'Jul 27 12:01',
			path: '../frontend.bash',
			stack: ['Svelte', 'Tailwind CSS', 'Vite'],
			cwd: '~/frontend'
		},
		{
			name: 'devops',
			perms: 'drwxr-xr-x',
			count: 4,
			owner: 'user',
			group: 'group',
			size: 4096,
			date: 'Jul 27 12:02',
			path: '../devops.bash',
			stack: ['Docker', 'CI/CD', 'Cloud Deploy'],
			cwd: '~/devops'
		}
	];
</script>

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
			class="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-primary-900 to-primary-900/0
			"
		></div>
	</div>
</div>

<div class="box-border flex min-h-0 w-full max-w-[100vw] flex-row gap-4 overflow-x-auto">
	<div
		class="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"
	></div>
	<div class="mt-15 flex w-full min-w-0 flex-col gap-10">
		<!-- overview -->
		<div class="flex h-[100vh] flex-col gap-5">
			<p class="text-path">~/../overview</p>
			<!-- <Divider /> -->
			<div class="flex h-auto flex-row items-center justify-center gap-2 px-4">
				<div class="flex w-1/2 items-center justify-center bg-primary-700 p-10">?</div>
				<p class="w-1/2 flex-grow text-sm text-white/70">
					Hi, <span class="text-highlight">I'm Zhall </span> — a passionate
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
				</p>
			</div>
			<Carousel autoplay={2000} perPage={3} className="flex-grow bg-amber-200">
				<div class="h-100 w-[250px] flex-1 bg-primary-200"></div>
				<div class="h-100 w-[250px] flex-1 bg-primary-200"></div>
				<div class="h-100 w-[250px] flex-1 bg-primary-200"></div>
				<div class="h-100 w-[250px] flex-1 bg-primary-200"></div>
				<span class="display:inline;margin-top:6rem;" slot="left-control">Left</span>
				<span class="display:inline;margin-top:6rem;" slot="right-control">Right</span>
			</Carousel>
		</div>

		<!-- skills -->
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

		<!-- clients -->
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

		<!-- projects -->
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
		<!-- clients -->
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
