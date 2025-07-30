<script lang="ts">
	// filepath: src/lib/components/terminal/Terminal.svelte
	import { onMount } from 'svelte';
	import Prompt from './Prompt.svelte';
	import DirectoryEntry from './DirectoryEntry.svelte';

	// Virtual file system
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

	export let user: string = 'user';
	export let host: string = 'host';
	export let initialCwd: string = '/';
	let lsEntries: any[] = [];
	let cwd = initialCwd;
	let input = '';
	type OutputLine = { cmd: string; cwd: string; type?: 'prompt' | 'directory' | 'text' };
	let output: OutputLine[] = [];
	let history: OutputLine[] = [];
	let showSkills: string[] = [];
	let currentFile = '';

	function getDir(path: string) {
		const parts = path.split('/').filter(Boolean);
		let node = fs['/'];
		for (const part of parts) {
			if (node.children && node.children[part]) {
				node = node.children[part];
			} else {
				return null;
			}
		}
		return node;
	}

	function handleCommand(cmd: string) {
		const args = cmd.trim().split(' ');
		const command = args[0];

		switch (command) {
			case 'pwd': {
				output.push({ cmd: cwd, cwd });
				break;
			}
			case 'ls':
			case 'ls -a': {
				const dir = getDir(cwd);
				if (dir && dir.children) {
					const entries = Object.entries(dir.children).map(([name, entry]) => ({
						name,
						perms: entry.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--',
						count: entry.type === 'dir' ? Object.keys(entry.children).length : 1,
						owner: user,
						group: 'group',
						size: entry.type === 'dir' ? 4096 : (entry.content?.length ?? 0),
						date: '2023-10-01',
						type: entry.type,
						children: entry?.children,
						path: `/${name}`,
						cwd: `cat ${name}`
					}));
					lsEntries = entries;
					output.push({ cmd: entries.map((e) => e.name).join('  '), cwd, type: 'directory' });
				} else {
					output.push({ cmd: 'Not a directory', cwd, type: 'text' });
					lsEntries = [];
				}
				break;
			}
			case 'cd': {
				const target = args[1];
				if (!target) {
					output.push({ cmd: 'Usage: cd <directory>', cwd, type: 'text' });
					break;
				}
				let newPath = target.startsWith('/') ? target : (cwd === '/' ? '/' : cwd + '/') + target;
				const dir = getDir(newPath);
				if (dir && dir.type === 'dir') {
					cwd = newPath.replace(/\/+/g, '/');
					output.push({ cmd: `Changed directory to ${cwd}`, cwd, type: 'prompt' });
				} else {
					output.push({ cmd: 'No such directory', cwd, type: 'text' });
				}
				break;
			}
			case 'help': {
				output.push({
					cmd: 'Available commands: pwd, ls, ls -a, cd <dir>, cat <file>, cls, help',
					cwd,
					type: 'text'
				});
				break;
			}
			case 'cat': {
				const file = args[1];
				if (!file) {
					output.push({ cmd: 'Usage: cat <file>', cwd, type: 'text' });
					break;
				}
				const dir = getDir(cwd);
				if (dir && dir.children && dir.children[file] && dir.children[file].type === 'file') {
					const content = dir.children[file].content;
					showSkills = Array.isArray(content) ? content : [content];
					currentFile = file;
					output.push({
						cmd: `Contents of ${file}: ${Array.isArray(content) ? content.join(', ') : content}`,
						cwd,
						type: 'text'
					});
				} else {
					output.push({ cmd: 'No such file', cwd, type: 'text' });
				}
				break;
			}
			// 	const file = args[1];
			// 	if (!file) {
			// 		output.push({ cmd: 'Usage: cat <file>', cwd });
			// 		break;
			// 	}
			// 	const dir = getDir(cwd);
			// 	if (dir && dir.children && dir.children[file] && dir.children[file].type === 'file') {
			// 		const content = dir.children[file].content;
			// 		// Ensure showSkills is always an array
			// 		showSkills = Array.isArray(content) ? content : [content];
			// 		currentFile = file;
			// 		output.push({
			// 			cmd: `Contents of ${file}: ${Array.isArray(content) ? content.join(', ') : content}`,
			// 			cwd
			// 		});
			// 	} else {
			// 		output.push({ cmd: 'No such file', cwd });
			// 	}
			// 	break;
			// }
			case 'cls': {
				output = [];
				showSkills = [];
				currentFile = '';
				break;
			}
			default: {
				output.push({ cmd: 'Unknown command', cwd, type: 'text' });
			}
		}
		output = [...output];
	}

	function onEnter(cmd: string) {
		if (cmd.trim() === '') return;
		// history.push({ cmd, cwd });
		output.push({ cmd, cwd, type: 'prompt' });
		handleCommand(cmd);
		input = '';
	}

	onMount(() => {
		output.push({ cmd: 'Welcome to the Skills Terminal!', cwd, type: 'text' });
		output.push({ cmd: `Current directory: ${cwd}`, cwd, type: 'text' });
		output = [...output];
		handleCommand('ls -a');
		// output.push({ cmd: 'ls -a', cwd, type: 'directory' });
		// handleCommand('cd soft-dev');
	});
</script>

<div
	class="card-hovering mx-auto w-full overflow-auto rounded-xl border border-primary-50 bg-primary-900 shadow-lg"
	style="font-family: 'Fira Code', monospace; max-height: 600px;"
>
	<!-- Header bar -->
	<div
		class="flex items-center justify-between rounded-t-xl border-b border-primary-900 bg-primary-50 px-4 pt-3 pb-2"
	>
		<span class="text-xs tracking-tight text-neutral-900">../skills.bash</span>
		<div class="flex gap-2">
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
			<span class="h-3 w-3 rounded-full border bg-primary-900"></span>
		</div>
	</div>
	<!-- Terminal content area -->
	<div
		class="rounded-b-xl border-t border-primary-900 bg-primary-900 px-4 py-3 font-mono text-sm text-neutral-100"
	>
		<div class="px-4 py-2">
			{#each output as line}
				{#if line.type === 'directory'}
					{#if lsEntries.length}
						<div class="mt-2 border-l-1 border-primary-400 pl-4">
							{#each lsEntries as entry, i}
								<div class="flex flex-row items-center">
									<span class="mr-2 text-primary-400">[{i + 1}]</span>
									<DirectoryEntry {user} {host} item={entry} />
								</div>
							{/each}
						</div>
					{/if}
				{:else if line.type === 'prompt'}
					<Prompt {user} {host} cmd={line.cmd} pulse={false} cwd={line.cwd} />
				{:else}
					<Prompt {user} {host} cmd={line.cmd} pulse={false} cwd={line.cwd} color="text-gray-400" />
				{/if}
			{/each}

			<!-- Current Prompt -->
			<Prompt {user} {host} {cwd} {onEnter} pulse={true} color="text-gray-400" />
		</div>
	</div>
</div>
