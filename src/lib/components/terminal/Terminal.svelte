<script lang="ts">
	// filepath: src/lib/components/terminal/Terminal.svelte
	import { onMount, tick } from 'svelte';
	import Prompt from './Prompt.svelte';
	import DirectoryEntry from './DirectoryEntry.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let user: string = 'user';
	export let host: string = 'host';
	export let initialCwd: string = '/';
	export let fs: Object = {};
	export let handleOnMount: (handleCommand: (cmd: string) => void) => void = () => {};

	let lsEntries: any[] = [];
	let cwd = initialCwd;
	let input = '';
	type OutputLine = {
		cmd: string;
		cwd: string;
		type?: 'prompt' | 'directory' | 'text' | 'error' | 'success';
	};
	let output: OutputLine[] = [];
	let commandHistory: string[] = [];
	let historyIndex = -1;
	let showSkills: string[] = [];
	let currentFile = '';
	let showTerminal = false;
	let terminalElement: HTMLDivElement;
	let inputElement: HTMLInputElement;
	let suggestions: string[] = [];
	let showSuggestions = false;
	let fileViewerOpen = false;
	let fileViewerContent = '';
	let fileViewerName = '';
	let fileViewerLineNumbers: number[] = [];

	const availableCommands = [
		'pwd',
		'ls',
		'ls -a',
		'cd',
		'cat',
		'open',
		'help',
		'clear',
		'tree',
		'history'
	];

	function getSuggestions(partial: string) {
		if (!partial) return [];
		const parts = partial.trim().split(' ');
		const cmd = parts[0];

		if (parts.length === 1) {
			return availableCommands.filter((c) => c.startsWith(cmd));
		}

		if (cmd === 'cd' || cmd === 'cat' || cmd === 'open') {
			const dir = getDir(cwd);
			if (dir && dir.children) {
				const prefix = parts[1] || '';
				return Object.keys(dir.children)
					.filter((name) => name.startsWith(prefix))
					.map((name) => `${cmd} ${name}`);
			}
		}

		return [];
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				input = commandHistory[commandHistory.length - 1 - historyIndex] || '';
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				input = commandHistory[commandHistory.length - 1 - historyIndex] || '';
			} else {
				historyIndex = -1;
				input = '';
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const suggs = getSuggestions(input);
			if (suggs.length === 1) {
				input = suggs[0];
			} else if (suggs.length > 1) {
				suggestions = suggs;
				showSuggestions = true;
			}
		} else {
			showSuggestions = false;
		}
	}

	async function scrollToBottom() {
		await tick();
		if (terminalElement) {
			terminalElement.scrollTop = terminalElement.scrollHeight;
		}
	}

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

	function handleCommand(cmd: string, showPrompt: boolean = true) {
		const args = cmd.trim().split(' ');
		const command = args[0];

		if (showPrompt) {
			output.push({ cmd, cwd, type: 'prompt' });
		}

		if (cmd.includes('&&')) {
			const commands = cmd
				.split('&&')
				.map((c) => c.trim())
				.filter(Boolean);
			for (const singleCmd of commands) {
				handleCommand(singleCmd, false);
			}
			scrollToBottom();
			return;
		}

		switch (command) {
			case 'pwd': {
				output.push({ cmd: cwd, cwd, type: 'success' });
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
						cwd: `open ${name}`
					}));
					lsEntries = entries;
					output.push({ cmd: `${entries.length}`, cwd, type: 'directory' });
				} else {
					output.push({ cmd: '❌ Not a directory', cwd, type: 'error' });
					lsEntries = [];
				}
				break;
			}
			case 'tree': {
				const dir = getDir(cwd);
				if (dir && dir.type === 'dir') {
					let treeOutput = '📂 ' + (cwd === '/' ? 'root' : cwd.split('/').pop()) + '\n';
					function buildTree(node: any, prefix: string = '', isLast: boolean = true) {
						if (!node.children) return '';
						const entries = Object.entries(node.children);
						entries.forEach(([name, child], index) => {
							const isLastEntry = index === entries.length - 1;
							const connector = isLastEntry ? '└── ' : '├── ';
							const icon = child.type === 'dir' ? '📁' : '📄';
							treeOutput += prefix + connector + icon + ' ' + name + '\n';
							if (child.type === 'dir' && child.children) {
								const newPrefix = prefix + (isLastEntry ? '    ' : '│   ');
								buildTree(child, newPrefix, isLastEntry);
							}
						});
					}
					buildTree(dir);
					output.push({ cmd: treeOutput, cwd, type: 'success' });
				} else {
					output.push({ cmd: '❌ Not a directory', cwd, type: 'error' });
				}
				break;
			}
			case 'cd': {
				const target = args[1];
				if (!target) {
					output.push({ cmd: '⚠️  Usage: cd <directory>', cwd, type: 'error' });
					break;
				}
				let newPath = '';
				if (target === '..') {
					if (cwd === '/' || cwd === '') {
						newPath = '/';
					} else {
						const parts = cwd.split('/').filter(Boolean);
						parts.pop();
						newPath = '/' + parts.join('/');
						if (newPath === '') newPath = '/';
					}
				} else {
					newPath = target.startsWith('/') ? target : (cwd === '/' ? '/' : cwd + '/') + target;
				}
				const dir = getDir(newPath);
				if (dir && dir.type === 'dir') {
					cwd = newPath.replace(/\/+/g, '/');
					output.push({ cmd: `✓ Changed to ${cwd}`, cwd, type: 'success' });
				} else {
					output.push({ cmd: `❌ Directory not found: ${target}`, cwd, type: 'error' });
				}
				break;
			}
			case 'help': {
				const helpText = `
╔═══════════════════════════════════════╗
║         AVAILABLE COMMANDS            ║
╠═══════════════════════════════════════╣
║  pwd          - Print working dir     ║
║  ls / ls -a   - List directory        ║
║  cd <dir>     - Change directory      ║
║  cat <file>   - Show file content     ║
║  open <file>  - Open file in viewer   ║
║  tree         - Show directory tree   ║
║  history      - Show command history  ║
║  clear        - Clear terminal        ║
║  help         - Show this help        ║
╠═══════════════════════════════════════╣
║  SHORTCUTS:                           ║
║  ↑/↓          - Navigate history      ║
║  Tab          - Autocomplete          ║
╚═══════════════════════════════════════╝`;
				output.push({ cmd: helpText, cwd, type: 'text' });
				break;
			}
			case 'history': {
				if (commandHistory.length === 0) {
					output.push({ cmd: 'No command history', cwd, type: 'text' });
				} else {
					const historyText = commandHistory.map((cmd, i) => `  ${i + 1}. ${cmd}`).join('\n');
					output.push({ cmd: `\n📜 Command History:\n${historyText}`, cwd, type: 'text' });
				}
				break;
			}
			case 'cat': {
				const file = args[1];
				if (!file) {
					output.push({ cmd: '⚠️  Usage: cat <file>', cwd, type: 'error' });
					break;
				}
				const dir = getDir(cwd);
				if (dir && dir.children && dir.children[file] && dir.children[file].type === 'file') {
					const content = dir.children[file].content;
					showSkills = Array.isArray(content) ? content : [content];
					currentFile = file;
					const displayContent = Array.isArray(content) ? content.join(', ') : content;
					output.push({
						cmd: `📄 ${file}:\n${displayContent}`,
						cwd,
						type: 'success'
					});
				} else {
					output.push({ cmd: `❌ File not found: ${file}`, cwd, type: 'error' });
				}
				break;
			}
			case 'open': {
				const file = args[1];
				if (!file) {
					output.push({ cmd: '⚠️  Usage: open <file>', cwd, type: 'error' });
					break;
				}
				const dir = getDir(cwd);
				if (dir && dir.children && dir.children[file] && dir.children[file].type === 'file') {
					const content = dir.children[file].content;
					const displayContent = Array.isArray(content) ? content.join('\n') : content;
					fileViewerContent = displayContent;
					fileViewerName = file;
					fileViewerLineNumbers = displayContent.split('\n').map((_, i) => i + 1);
					fileViewerOpen = true;
					output.push({
						cmd: `✓ Opened ${file} in viewer`,
						cwd,
						type: 'success'
					});
				} else {
					output.push({ cmd: `❌ File not found: ${file}`, cwd, type: 'error' });
				}
				break;
			}
			case 'clear':
			case 'cls': {
				output = [];
				showSkills = [];
				currentFile = '';
				lsEntries = [];
				output.push({ cmd: '✓ Terminal cleared', cwd, type: 'success' });
				break;
			}
			default: {
				if (command) {
					output.push({
						cmd: `❌ Command not found: '${command}'\nType 'help' for available commands`,
						cwd,
						type: 'error'
					});
				}
			}
		}

		output = [...output];
		scrollToBottom();
	}

	function onEnter(cmd: string) {
		if (cmd.trim() === '') return;
		commandHistory.push(cmd.trim());
		historyIndex = -1;
		handleCommand(cmd);
		input = '';
		showSuggestions = false;
	}

	onMount(() => {
		const welcomeMsg = `
╔═══════════════════════════════════════╗
║   🚀 SKILLS TERMINAL v2.0            ║
║   Type 'help' for available commands  ║
╚═══════════════════════════════════════╝`;
		output.push({ cmd: welcomeMsg, cwd, type: 'text' });
		output = [...output];
		handleOnMount(handleCommand);
		showTerminal = true;
		scrollToBottom();
	});
</script>

<div
	class="group relative mx-auto w-full overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-500/20"
	style="font-family: 'Fira Code', monospace;"
>
	<!-- Scan line effect -->
	<div
		class="pointer-events-none absolute inset-0 opacity-10"
		style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.03) 2px, rgba(6,182,212,0.03) 4px);"
	></div>

	<!-- Header bar -->
	<div
		class="relative flex items-center justify-between border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-black to-cyan-950/40 px-4 pt-3 pb-2 backdrop-blur-sm"
	>
		<div class="flex items-center gap-3">
			<div class="flex gap-1.5">
				<button
					class="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20 transition-colors hover:bg-red-500/40"
				></button>
				<button
					class="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20 transition-colors hover:bg-yellow-500/40"
				></button>
				<button
					class="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20 transition-colors hover:bg-green-500/40"
				></button>
			</div>
			<span class="font-mono text-xs font-medium tracking-tight text-cyan-400">
				⚡ skills.terminal
			</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="animate-pulse text-xs text-green-400">●</span>
			<span class="text-xs text-cyan-400/60">ONLINE</span>
		</div>
	</div>

	<div
		bind:this={terminalElement}
		class="relative overflow-auto bg-black/90 px-4 py-3 font-mono text-sm text-cyan-100 backdrop-blur-sm"
		style="max-height: 600px; min-height: 400px;"
	>
		<!-- Grid pattern overlay -->
		<div
			class="pointer-events-none absolute inset-0 opacity-5"
			style="background-image: radial-gradient(rgba(6,182,212,0.3) 1px, transparent 1px); background-size: 20px 20px;"
		></div>

		{#if showTerminal}
			<div class="relative px-2 py-2">
				{#each output as line, idx (idx)}
					{@const lineType = line.type || 'text'}
					{#if lineType === 'directory'}
						{#if lsEntries.length}
							<div
								class="my-3 rounded-lg border-l-2 border-cyan-500/40 bg-cyan-950/20 p-3"
								in:fly={{ y: 10, duration: 400, easing: cubicOut }}
							>
								<div class="mb-2 flex items-center gap-2">
									<span class="text-cyan-400">📂</span>
									<span class="text-xs font-semibold text-cyan-300">{line.cmd}</span>
								</div>
								<div class="flex flex-col gap-2">
									{#each lsEntries as entry, i}
										<div
											class="group/item flex items-center gap-2 rounded border border-cyan-500/20 bg-black/40 p-2 transition-all hover:border-cyan-400/40 hover:bg-cyan-950/30"
											in:fly={{ x: -10, duration: 300, delay: i * 50 }}
										>
											<span class="font-mono text-xs text-cyan-500">[{i + 1}]</span>
											<span class="text-lg">{entry.type === 'dir' ? '📁' : '📄'}</span>
											<DirectoryEntry {user} {host} item={entry} />
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{:else if lineType === 'prompt'}
						<div class="my-1" in:fade={{ duration: 200 }}>
							<Prompt {user} {host} cmd={line.cmd} pulse={false} cwd={line.cwd} />
						</div>
					{:else if lineType === 'error'}
						<div
							class="my-2 rounded border-l-2 border-red-500/50 bg-red-950/20 p-2 pl-3"
							in:fly={{ x: -5, duration: 300 }}
						>
							<pre class="font-mono text-sm whitespace-pre-wrap text-red-300">{line.cmd}</pre>
						</div>
					{:else if lineType === 'success'}
						<div
							class="my-2 rounded border-l-2 border-green-500/50 bg-green-950/20 p-2 pl-3"
							in:fly={{ x: -5, duration: 300 }}
						>
							<pre class="font-mono text-sm whitespace-pre-wrap text-green-300">{line.cmd}</pre>
						</div>
					{:else}
						<div class="my-1" in:fade={{ duration: 300 }}>
							<pre class="font-mono text-sm whitespace-pre-wrap text-cyan-100/70">{line.cmd}</pre>
						</div>
					{/if}
				{/each}

				<!-- Current Prompt with input -->
				<div class="relative mt-3">
					{#if showSuggestions && suggestions.length > 0}
						<div
							class="absolute bottom-full left-0 mb-2 rounded border border-cyan-500/30 bg-black/90 p-2 backdrop-blur-sm"
							in:fly={{ y: 5, duration: 200 }}
						>
							<div class="mb-1 text-xs text-cyan-400">Suggestions:</div>
							{#each suggestions as suggestion}
								<button
									on:click={() => {
										input = suggestion;
										showSuggestions = false;
									}}
									class="block w-full rounded px-2 py-1 text-left text-sm text-cyan-300 transition-colors hover:bg-cyan-950/50"
								>
									{suggestion}
								</button>
							{/each}
						</div>
					{/if}

					<div class="flex items-center gap-2">
						<span class="font-mono text-cyan-400">{user}@{host}</span>
						<span class="text-purple-400">:</span>
						<span class="font-mono text-blue-400">{cwd}</span>
						<span class="text-green-400">$</span>
						<input
							bind:this={inputElement}
							bind:value={input}
							on:keydown={handleKeyDown}
							on:keydown={(e) => {
								if (e.key === 'Enter') {
									onEnter(input);
								}
							}}
							on:input={() => {
								suggestions = getSuggestions(input);
								showSuggestions = suggestions.length > 0;
							}}
							class="flex-1 bg-transparent font-mono text-cyan-100 outline-none placeholder:text-cyan-700"
							placeholder="Type a command... (↑↓ for history, Tab for autocomplete)"
							autocomplete="off"
							spellcheck="false"
						/>
						<span class="animate-pulse text-cyan-400">▊</span>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom glow effect -->
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
	></div>
</div>

<style>
	@keyframes scan {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(100%);
		}
	}
</style>
