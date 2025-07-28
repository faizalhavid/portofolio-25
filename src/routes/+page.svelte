<script>
	import ClientsCard from '$lib/components/cards/ClientCard.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import PromptContainer from '$lib/components/cards/PromptCard.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import WorkTimeline from '$lib/components/WorkTimeline.svelte';
	import { loadJsonArray } from '$lib/utils/load-json.js';
	import Marquee from 'svelte-fast-marquee';
	import { onMount } from 'svelte';
	import PatternBackground from '$lib/components/PatternBackground.svelte';

	// @ts-ignore
	let experience = [];
	let mount = false;

	onMount(async () => {
		experience = await loadJsonArray('/jsons/experience.json');
		mount = true;
		console.log(experience);
	});
</script>

<div class="flex max-h-[100vh] min-h-0 flex-col overflow-y-clip">
	<!-- title -->
	<div class="px-25 z-10 flex flex-col gap-5 pt-[15rem]">
		<div class="mx-auto w-fit">
			<p class="text-6xl font-medium">CodeIt-deployIt</p>
			<p class="ml-40 mt-4 text-6xl font-medium">DesignIt-renderIt</p>
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
	<div class="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen flex-grow">
		<img src="/images/main-banner.jpg" alt="Main Banner" class="h-full w-full object-cover" />
		<div
			class="from-primary-900 to-primary-900/0 pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b
            "
		></div>
	</div>
</div>

<div class="box-border flex min-h-0 w-full max-w-[100vw] flex-row gap-4 overflow-x-auto">
	<div
		class="border-x-(--pattern-fg) [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10 col-start-2 row-span-5 row-start-1 border-x bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden"
	></div>
	<div class="mt-15 flex w-full min-w-0 flex-col gap-10">
		<!-- overview -->
		<div class="flex flex-col justify-between">
			<p class="text-path">~/../overview</p>
			<div class="flex h-auto flex-row items-center justify-center gap-2 px-4">
				<div class="bg-primary-700 flex w-1/2 items-center justify-center p-10">?</div>
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
		</div>

		<!-- skills -->
		<div class="flex flex-col justify-between gap-2">
			<p class="text-path">~/../skills</p>
			<div class="flex flex-col p-4">
				<PromptContainer
					title="software-development.bash"
					className="my-4"
					command={['run ls -a backend/']}
				>
					<div class="rounded p-4 font-mono text-sm text-green-400 shadow-md">
						<details class="flex flex-col text-green-400">
							<summary class="flex cursor-pointer gap-4">
								<span class="w-16">drwxr-xr-x</span>
								<span class="w-6">5</span>
								<span class="w-16">user</span>
								<span class="w-16">group</span>
								<span class="w-16 text-right">4096</span>
								<span class="w-28">Jul 27 12:00</span>
								<span class="flex-1">../backend.bash</span>
							</summary>
							<div class="mt-1 pl-[120px] font-mono text-green-400">
								<ul class="relative ml-4 border-l border-green-400">
									<li
										class="relative pl-4 before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-4 before:border-t before:border-green-400 before:content-['']"
									>
										Node.js
									</li>
									<li
										class="relative pl-4 before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-4 before:border-t before:border-green-400 before:content-['']"
									>
										Express
									</li>
									<li
										class="relative pl-4 before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-4 before:border-t before:border-green-400 before:content-['']"
									>
										PostgreSQL
									</li>
								</ul>
							</div>
						</details>

						<div class="flex gap-4">
							<span class="w-16">drwxr-xr-x</span>
							<span class="w-6">3</span>
							<span class="w-16">user</span>
							<span class="w-16">group</span>
							<span class="w-16 text-right">4096</span>
							<span class="w-28">Jul 27 12:01</span>
							<span class="flex-1">../frontend.bash</span>
						</div>
						<div class="flex gap-4">
							<span class="w-16">drwxr-xr-x</span>
							<span class="w-6">4</span>
							<span class="w-16">user</span>
							<span class="w-16">group</span>
							<span class="w-16 text-right">4096</span>
							<span class="w-28">Jul 27 12:02</span>
							<span class="flex-1">../devops.bash</span>
						</div>
					</div>
				</PromptContainer>
				<PromptContainer
					title="Creative-visual"
					className="my-4"
					command={['run ls -a creative-visual/']}
				>
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
					<ul class="list-disc pl-5">
						<li>Skill 1</li>
						<li>Skill 2</li>
						<li>Skill 3</li>
					</ul>
				</PromptContainer>
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
		class="mt-15 relative left-1/2 right-1/2 z-0 ml-[-50vw] mr-[-50vw] flex w-screen flex-col items-center justify-center gap-4 p-8 text-white"
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
