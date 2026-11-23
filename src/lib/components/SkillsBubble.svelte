<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { cubicOut, elasticOut } from 'svelte/easing';

	interface Skill {
		name: string;
		size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		color: string;
		category: string;
	}

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		color: string;
		life: number;
	}

	export let skills: Skill[] = [];

	let mounted = false;
	let containerWidth = 0;
	let containerHeight = 0;
	let score = 0;
	let combo = 0;
	let comboTimer: NodeJS.Timeout;
	let particles: Particle[] = [];
	let poppingBubbles = new Set<number>();
	let gameMode = false;

	let bubbles: Array<{
		skill: Skill;
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		id: number;
		angle: number;
		floatSpeed: number;
		orbitRadius: number;
		rotationSpeed: number;
		scale: number;
		targetX: number;
		targetY: number;
		categoryIndex: number;
	}> = [];

	// Category centers for tree structure
	const categoryPositions: { [key: string]: { x: number; y: number; color: string } } = {
		Languages: { x: 0.2, y: 0.3, color: 'rgb(6,182,212)' },
		Frameworks: { x: 0.5, y: 0.2, color: 'rgb(168,85,247)' },
		Tools: { x: 0.8, y: 0.3, color: 'rgb(59,130,246)' },
		Design: { x: 0.35, y: 0.65, color: 'rgb(236,72,153)' },
		DevOps: { x: 0.65, y: 0.65, color: 'rgb(34,197,94)' }
	};

	const sizeMap = {
		xs: { radius: 30, fontSize: 'text-[10px]', points: 10 },
		sm: { radius: 45, fontSize: 'text-xs', points: 20 },
		md: { radius: 60, fontSize: 'text-sm', points: 30 },
		lg: { radius: 80, fontSize: 'text-base', points: 50 },
		xl: { radius: 100, fontSize: 'text-lg', points: 100 }
	};

	function initBubbles() {
		// Group skills by category
		const categoryCounts: { [key: string]: number } = {};
		const categoryBubbles: { [key: string]: number } = {};

		skills.forEach((skill) => {
			categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
		});

		bubbles = skills.map((skill, index) => {
			const sizeConfig = sizeMap[skill.size];
			const categoryPos = categoryPositions[skill.category] || { x: 0.5, y: 0.5 };

			// Calculate position within category cluster
			const categoryIndex = categoryBubbles[skill.category] || 0;
			categoryBubbles[skill.category] = categoryIndex + 1;

			const totalInCategory = categoryCounts[skill.category];
			const angleInCluster = (categoryIndex / totalInCategory) * Math.PI * 2;
			const radiusFromCenter = 80 + Math.random() * 60;

			const targetX = categoryPos.x * containerWidth + Math.cos(angleInCluster) * radiusFromCenter;
			const targetY = categoryPos.y * containerHeight + Math.sin(angleInCluster) * radiusFromCenter;

			return {
				skill,
				x: targetX + (Math.random() - 0.5) * 40,
				y: targetY + (Math.random() - 0.5) * 40,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: sizeConfig.radius,
				id: index,
				angle: Math.random() * Math.PI * 2,
				floatSpeed: 0.01 + Math.random() * 0.02,
				orbitRadius: 5 + Math.random() * 10,
				rotationSpeed: (Math.random() - 0.5) * 0.02,
				scale: 1,
				targetX,
				targetY,
				categoryIndex
			};
		});
	}

	function createParticles(x: number, y: number, color: string) {
		for (let i = 0; i < 15; i++) {
			const angle = (Math.PI * 2 * i) / 15;
			const speed = 2 + Math.random() * 3;
			particles.push({
				x,
				y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				color,
				life: 1
			});
		}
		particles = particles;
	}

	function popBubble(bubbleId: number) {
		if (!gameMode || poppingBubbles.has(bubbleId)) return;

		const bubble = bubbles.find((b) => b.id === bubbleId);
		if (!bubble) return;

		poppingBubbles.add(bubbleId);
		createParticles(bubble.x, bubble.y, bubble.skill.color);

		// Calculate score with combo multiplier
		combo++;
		const sizeConfig = sizeMap[bubble.skill.size];
		const points = sizeConfig.points * combo;
		score += points;

		// Clear existing combo timer and set new one
		clearTimeout(comboTimer);
		comboTimer = setTimeout(() => {
			combo = 0;
		}, 1000);

		// Remove bubble after animation
		setTimeout(() => {
			bubbles = bubbles.filter((b) => b.id !== bubbleId);
			poppingBubbles.delete(bubbleId);
		}, 300);
	}

	function toggleGameMode() {
		gameMode = !gameMode;
		if (gameMode) {
			score = 0;
			combo = 0;
			initBubbles();
		}
	}

	function checkCollision(b1: any, b2: any) {
		// Update particles
		particles = particles
			.map((p) => ({
				...p,
				x: p.x + p.vx,
				y: p.y + p.vy,
				vy: p.vy + 0.1, // gravity
				life: p.life - 0.02
			}))
			.filter((p) => p.life > 0);

		const dx = b2.x - b1.x;
		const dy = b2.y - b1.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		return distance < b1.radius + b2.radius;
	}

	function resolveCollision(b1: any, b2: any, sameCat: boolean = false) {
		const dx = b2.x - b1.x;
		const dy = b2.y - b1.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < b1.radius + b2.radius) {
			const angle = Math.atan2(dy, dx);
			const targetX = b1.x + Math.cos(angle) * (b1.radius + b2.radius);
			const targetY = b1.y + Math.sin(angle) * (b1.radius + b2.radius);

			// Softer collision for same category (they cluster together)
			const collisionStrength = sameCat ? 0.03 : 0.06;
			const ax = (targetX - b2.x) * collisionStrength;
			const ay = (targetY - b2.y) * collisionStrength;

			// Apply collision forces
			b1.vx -= ax;
			b1.vy -= ay;
			b2.vx += ax;
			b2.vy += ay;

			// Add slight rotation change on collision for more dynamic feel
			b1.angle += 0.05;
			b2.angle -= 0.05;

			// Gentle separation to prevent sticking
			const overlap = b1.radius + b2.radius - distance;
			if (overlap > 0) {
				const separateX = (dx / distance) * overlap * 0.3;
				const separateY = (dy / distance) * overlap * 0.3;

				b1.x -= separateX;
				b1.y -= separateY;
				b2.x += separateX;
				b2.y += separateY;
			}
		}
	}

	function animate() {
		bubbles = bubbles.map((bubble) => {
			let {
				x,
				y,
				vx,
				vy,
				radius,
				angle,
				floatSpeed,
				orbitRadius,
				rotationSpeed,
				scale,
				targetX,
				targetY
			} = bubble;

			// Update angle for floating motion
			angle += floatSpeed;

			// Add sine wave floating effect around target position
			const floatX = Math.sin(angle) * orbitRadius;
			const floatY = Math.cos(angle * 0.7) * orbitRadius;

			// Calculate attraction to target position (cluster center)
			const dx = targetX - x;
			const dy = targetY - y;
			const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

			// Apply spring force toward target with floating offset
			const springStrength = 0.02;
			const targetForceX = dx * springStrength;
			const targetForceY = dy * springStrength;

			// Apply forces
			vx += targetForceX;
			vy += targetForceY;
			vx += floatX * 0.01;
			vy += floatY * 0.01;

			// Apply velocity
			x += vx;
			y += vy;

			// Apply friction
			vx *= 0.95;
			vy *= 0.95;

			// Soft boundary constraints (keep bubbles roughly in view)
			if (x < radius) {
				x = radius;
				vx = Math.abs(vx) * 0.5;
			} else if (x > containerWidth - radius) {
				x = containerWidth - radius;
				vx = -Math.abs(vx) * 0.5;
			}

			if (y < radius) {
				y = radius;
				vy = Math.abs(vy) * 0.5;
			} else if (y > containerHeight - radius) {
				y = containerHeight - radius;
				vy = -Math.abs(vy) * 0.5;
			}

			// Breathing/pulsing effect
			scale = 1 + Math.sin(angle * 2) * 0.04;

			return { ...bubble, x, y, vx, vy, angle, scale };
		});

		// Handle collisions within same category (cluster cohesion)
		for (let i = 0; i < bubbles.length; i++) {
			for (let j = i + 1; j < bubbles.length; j++) {
				// Stronger collision response for same category (cluster together)
				const sameCat = bubbles[i].skill.category === bubbles[j].skill.category;
				if (checkCollision(bubbles[i], bubbles[j])) {
					resolveCollision(bubbles[i], bubbles[j], sameCat);
				}
			}
		}

		if (mounted) {
			requestAnimationFrame(animate);
		}
	}

	onMount(() => {
		containerWidth = 1200;
		containerHeight = 600;
		initBubbles();
		mounted = true;
		animate();

		return () => {
			mounted = false;
		};
	});
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black via-gray-900 to-black p-8 backdrop-blur-sm"
>
	<!-- Background effects -->
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div
			class="absolute inset-0"
			style="background: radial-gradient(circle at 20% 30%, rgba(6,182,212,0.1), transparent 50%)"
		></div>
		<div
			class="absolute inset-0"
			style="background: radial-gradient(circle at 80% 70%, rgba(168,85,247,0.1), transparent 50%)"
		></div>
	</div>

	<!-- Grid pattern -->
	<div
		class="pointer-events-none absolute inset-0 opacity-5"
		style="background-image: radial-gradient(rgba(6,182,212,0.3) 1px, transparent 1px); background-size: 20px 20px;"
	></div>

	<div class="relative mx-auto h-[600px] w-full max-w-[1200px]">
		<!-- Category connection lines (tree branches) -->
		<svg class="pointer-events-none absolute inset-0 z-0" width="100%" height="100%">
			{#each Object.entries(categoryPositions) as [category, pos]}
				{@const centerX = pos.x * 1200}
				{@const centerY = pos.y * 600}
				<!-- Draw lines from category center to each bubble -->
				{#each bubbles.filter((b) => b.skill.category === category) as bubble}
					<line
						x1={centerX}
						y1={centerY}
						x2={bubble.x}
						y2={bubble.y}
						stroke={pos.color}
						stroke-width="1"
						opacity="0.15"
						class="transition-all duration-300"
					/>
				{/each}
				<!-- Category center node -->
				<circle
					cx={centerX}
					cy={centerY}
					r="8"
					fill={pos.color}
					opacity="0.6"
					class="animate-pulse-slow"
				/>
				<circle
					cx={centerX}
					cy={centerY}
					r="15"
					fill="none"
					stroke={pos.color}
					stroke-width="2"
					opacity="0.3"
					class="animate-pulse-ring"
				/>
			{/each}
		</svg>

		<!-- Particles -->
		{#each particles as particle (particle)}
			<div
				class="pointer-events-none absolute h-2 w-2 rounded-full"
				style="
					left: {particle.x}px;
					top: {particle.y}px;
					background: {particle.color};
					opacity: {particle.life};
					box-shadow: 0 0 8px {particle.color};
				"
			></div>
		{/each}

		{#if bubbles.length > 0}
			{#each bubbles as bubble, i (bubble.id)}
				{@const sizeConfig = sizeMap[bubble.skill.size]}
				{@const isPopping = poppingBubbles.has(bubble.id)}
				<button
					class="group absolute flex items-center justify-center rounded-full border-2 transition-all duration-500 hover:z-10 {gameMode
						? 'cursor-pointer hover:scale-110 active:scale-95'
						: ''}"
					style="
						left: {bubble.x - bubble.radius * bubble.scale}px;
						top: {bubble.y - bubble.radius * bubble.scale}px;
						width: {bubble.radius * 2 * bubble.scale}px;
						height: {bubble.radius * 2 * bubble.scale}px;
						border-color: {bubble.skill.color};
						background: radial-gradient(circle at 30% 30%, {bubble.skill.color}30, {bubble.skill.color}08);
						box-shadow: 0 0 20px {bubble.skill.color}30, inset 0 0 20px {bubble.skill.color}15;
						transform: rotate({bubble.angle * 20}deg);
						transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
					"
					on:click={() => popBubble(bubble.id)}
					disabled={!gameMode}
					in:scale={{ duration: 600, delay: i * 50, easing: elasticOut }}
					out:scale={{ duration: 300, easing: cubicOut }}
				>
					<!-- Inner glow -->
					<div
						class="animate-pulse-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
						style="box-shadow: inset 0 0 30px {bubble.skill.color}80, 0 0 40px {bubble.skill
							.color}60, 0 0 60px {bubble.skill.color}40;"
					></div>

					<!-- Shimmer effect -->
					<div
						class="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
						style="background: linear-gradient(135deg, transparent 0%, {bubble.skill
							.color}20 50%, transparent 100%); 
						       animation: shimmer 3s ease-in-out infinite;
						       animation-delay: {i * 0.2}s;"
					></div>

					<!-- Solid background for text readability -->
					<div
						class="absolute rounded-full"
						style="
							width: {bubble.radius * 1.4}px;
							height: {bubble.radius * 1.4}px;
							background: radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 60%, transparent 100%);
						"
					></div>

					<!-- Content -->
					<div
						class="relative z-10 flex flex-col items-center justify-center gap-1 p-2 text-center"
					>
						<span
							class="font-mono leading-tight font-bold tracking-tight {sizeConfig.fontSize} drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
							style="color: {bubble.skill
								.color}; text-shadow: 0 0 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8);"
						>
							{bubble.skill.name}
						</span>
						{#if bubble.skill.size === 'lg' || bubble.skill.size === 'xl'}
							<span
								class="text-[9px] font-medium tracking-wider uppercase opacity-80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
								style="color: {bubble.skill
									.color}; text-shadow: 0 0 6px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8);"
							>
								{bubble.skill.category}
							</span>
						{/if}
					</div>

					<!-- Pulse effect on hover -->
					<div
						class="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-all duration-500 group-hover:animate-ping group-hover:opacity-30"
						style="background: radial-gradient(circle, {bubble.skill.color} 0%, transparent 70%);"
					></div>

					<!-- Floating particles around bubble -->
					<div
						class="animate-float-ring pointer-events-none absolute inset-0 rounded-full"
						style="background: radial-gradient(circle at 50% 50%, transparent 65%, {bubble.skill
							.color}20 70%, transparent 75%);"
					></div>

					<!-- Game mode indicator -->
					{#if gameMode}
						<div
							class="absolute -top-2 -right-2 z-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 px-2 py-1 text-[10px] font-bold text-white shadow-lg"
						>
							+{sizeConfig.points}
						</div>
					{/if}
				</button>
			{/each}
		{/if}

		<!-- Game Over Message -->
		{#if gameMode && bubbles.length === 0}
			<div
				class="absolute inset-0 flex flex-col items-center justify-center gap-4"
				in:scale={{ duration: 500, easing: elasticOut }}
			>
				<div class="text-6xl">🎉</div>
				<div class="text-center">
					<h3
						class="mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent"
					>
						All Bubbles Popped!
					</h3>
					<p class="font-mono text-2xl text-cyan-300">Final Score: {score}</p>
				</div>
				<button
					on:click={() => initBubbles()}
					class="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-mono text-lg font-bold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-blue-500"
				>
					Play Again
				</button>
			</div>
		{/if}
	</div>

	<!-- Legend -->
	<div
		class="relative mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-cyan-500/10 pt-6"
	>
		<div class="flex items-center gap-2">
			<div
				class="h-3 w-3 rounded-full"
				style="background: rgba(6,182,212,0.5); border: 1px solid rgb(6,182,212);"
			></div>
			<span class="font-mono text-xs text-cyan-400">Languages</span>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="h-3 w-3 rounded-full"
				style="background: rgba(168,85,247,0.5); border: 1px solid rgb(168,85,247);"
			></div>
			<span class="font-mono text-xs text-purple-400">Frameworks</span>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="h-3 w-3 rounded-full"
				style="background: rgba(59,130,246,0.5); border: 1px solid rgb(59,130,246);"
			></div>
			<span class="font-mono text-xs text-blue-400">Tools</span>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="h-3 w-3 rounded-full"
				style="background: rgba(236,72,153,0.5); border: 1px solid rgb(236,72,153);"
			></div>
			<span class="font-mono text-xs text-pink-400">Design</span>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="h-3 w-3 rounded-full"
				style="background: rgba(34,197,94,0.5); border: 1px solid rgb(34,197,94);"
			></div>
			<span class="font-mono text-xs text-green-400">DevOps</span>
		</div>
	</div>
</div>

<style>
	@keyframes ping {
		75%,
		100% {
			transform: scale(1.3);
			opacity: 0;
		}
	}

	@keyframes shimmer {
		0% {

	@keyframes pulse-slow {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.2);
		}
	}

	@keyframes pulse-ring {
		0% {
			opacity: 0.5;
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	.group:hover .group-hover\:animate-ping {
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.animate-float-ring {
		animation: float-ring 4s ease-in-out infinite;
	}

	.animate-pulse-glow {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	@keyframes pulse-slow {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.2);
		}
	}

	@keyframes pulse-ring {
		0% {
			opacity: 0.5;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(2);
		}
	}

	.animate-pulse-slow {
		animation: pulse-slow 3s ease-in-out infinite;
	}

	.animate-pulse-ring {
		animation: pulse-ring 2s ease-out infinite;
	}
</style>
