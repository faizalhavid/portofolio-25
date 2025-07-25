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
	// @ts-ignore
	let experience = [];

	onMount(async () => {
		experience = await loadJsonArray('/jsons/experience.json');
		console.log(experience);
	});
</script>

<div class="-my-10 flex flex-col">
	<div
		class="relative z-100 mt-16 flex
	h-[60vh] w-full items-center justify-center bg-center"
		style="background-image: url('/pattern-1.svg');"
	>
		<div class="mx-auto w-fit">
			<p class="text-6xl font-medium">CodeIt-deployIt</p>
			<p class="mt-4 ml-40 text-6xl font-medium">DesignIt-renderIt</p>
		</div>
	</div>

	<div class="relative -top-25 z-0 w-full">
		<div class="absolute -top-5 left-0 z-10 flex w-full flex-row justify-between">
			{#each experience as exp}
				<div class="flex flex-col gap-1">
					<p class="text-lg font-medium">{exp.name}</p>
					<p class="font-regular text-sm">
						{exp.years}+ <span class="text-green-500">years-exp</span>
					</p>
				</div>
			{/each}
		</div>
		<div class="relative right-1/2 left-1/2 z-0 mt-15 mr-[-50vw] ml-[-50vw] w-screen">
			<img
				src="/images/main-banner.jpg"
				alt="Main Banner"
				class="w-full object-cover"
				style="height: calc(100vh - 400px);"
			/>
			<div
				class="pointer-events-none absolute top-0 left-0 h-full w-full"
				style="background: linear-gradient(to bottom, #111827, rgba(17,24,39,0));
				box-shadow: 0 40px 80px -20px rgba(0,0,0,0.7);
			"
			></div>
		</div>
	</div>
</div>

<div class="box-border flex w-full max-w-[100vw] flex-row gap-4 overflow-x-auto">
	<Divider direction="vertical" thickness="0.125rem" />
	<div class="flex w-full min-w-0 flex-col gap-8">
		<!-- overview -->
		<div class="flex flex-row justify-between">
			<p class="text-2xl font-medium">../overview</p>
			<p class="w-1/2 text-sm">
				../Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.
				“It’s not Latin, though it looks like it, and it actually says nothing,” Before & After
				magazine answered a curious reader.
			</p>
		</div>

		<!-- skills -->
		<div class="flex flex-col justify-between gap-2">
			<p class="text-2xl font-medium">../skills</p>
			<PromptContainer
				title="Software-development"
				className="my-4"
				command={['run ls -a backend/']}
			>
				<div class="flex gap-2">
					<button class={`mr-1 rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../backend.bash
					</button>
					<button class={`mr-1 rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../frontend.bash
					</button>
					<button class={`rounded border bg-gray-800 px-2 py-0.5 text-xs text-white`}>
						../devops.bash
					</button>
				</div>
				<ul class="list-disc pl-5">
					<li>Skill 1</li>
					<li>Skill 2</li>
					<li>Skill 3</li>
				</ul>
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

		<!-- clients -->
		<div class="mx-auto flex w-full flex-col gap-4">
			<p class="text-2xl font-medium">../Clients</p>
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
			<p class="text-2xl font-medium">../Projects</p>
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
			<p class="text-2xl font-medium">../Clients</p>
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
		<p class="text-2xl font-medium">../Connect-with-me</p>
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
