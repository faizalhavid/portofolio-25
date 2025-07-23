<script>
	import ClientsCard from '$lib/components/cards/ClientsCard.svelte';
	import PromptContainer from '$lib/components/cards/PromptCard.svelte';
	import Divider from '$lib/components/Divider.svelte';
</script>

<div
	class="relative flex h-[350px] w-full items-center justify-center bg-center"
	style="background-image: url('/pattern-1.svg');"
>
	<div class="mx-auto w-fit">
		<p class="mt-4 text-6xl font-medium">CodeIt-deployIt</p>
		<p class="mt-4 ml-40 text-6xl font-medium">DesignIt-renderIt</p>
	</div>
</div>
<div class="relative w-full">
	<div class="absolute top-0 left-0 z-10 flex w-full flex-row justify-between">
		<div class="flex flex-col gap-1">
			<p class="text-lg font-medium">Creative-visual</p>
			<p class="font-regular text-sm">3+ <span class="text-green-500">years-exp</span></p>
		</div>
		<div class="flex flex-col gap-1">
			<p class="text-lg font-medium">Creative-visual</p>
			<p class="font-regular text-sm">3+ <span class="text-green-500">years-exp</span></p>
		</div>
		<div class="flex flex-col gap-1">
			<p class="text-lg font-medium">Creative-visual</p>
			<p class="font-regular text-sm">3+ <span class="text-green-500">years-exp</span></p>
		</div>
		<div class="flex flex-col gap-1">
			<p class="text-lg font-medium">Creative-visual</p>
			<p class="font-regular text-sm">3+ <span class="text-green-500">years-exp</span></p>
		</div>
		<div class="flex flex-col gap-1">
			<p class="text-lg font-medium">Creative-visual</p>
			<p class="font-regular text-sm">3+ <span class="text-green-500">years-exp</span></p>
		</div>
	</div>
	<div class="relative right-1/2 left-1/2 z-0 mr-[-50vw] ml-[-50vw] w-screen">
		<img
			src="/images/main-banner.jpg"
			alt="Main Banner"
			class="w-full object-cover"
			style="height: calc(100vh - 350px);"
		/>
		<div
			class="pointer-events-none absolute top-0 left-0 h-full w-full"
			style="background: linear-gradient(to bottom, #111827, rgba(17,24,39,0));"
		></div>
	</div>
</div>
<div class="flex flex-row gap-4">
	<Divider className="max-h-screen" thickness="0.25px" />
	<div class="mt-12 flex flex-1 flex-col gap-6">
		<!-- overview -->
		<div class="flex flex-row justify-between">
			<p class="text-2xl font-medium">../overview</p>
			<p class="w-1/2 text-sm">
				../Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.
				“It’s not Latin, though it looks like it, and it actually says nothing,” Before & After
				magazine answered a curious reader./p>
			</p>
		</div>

		<!-- skills -->
		<div class="flex flex-col justify-between">
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
		<div class="flex flex-col justify-between">
			<p class="text-2xl font-medium">../Clients</p>
			<ClientsCard
				name="Client 1"
				description="Description for Client 1"
				externalLink="https://client1.com"
				avatar="/images/client1.jpg"
				image="/images/client1-bg.jpg"
			/>
			<ClientsCard
				name="Client 2"
				description="Description for Client 2"
				externalLink="https://client2.com"
				avatar="/images/client2.jpg"
				image="/images/client2-bg.jpg"
			/>
		</div>
	</div>
</div>
