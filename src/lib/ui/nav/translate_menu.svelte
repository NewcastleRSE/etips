<script lang="ts">
	import { onMount } from 'svelte'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	const translate_icon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-language" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 5h7" />
  <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
  <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
  <path d="M12 20l4 -9l4 9" />
  <path d="M19.1 18h-6.2" />
</svg>`
	type Browser = { key: string; name: string; steps: string[] }
	let browsers: Browser[] = [
		{
			key: 'chrome',
			name: 'Google Chrome',
			steps: [
				'Phone: tap the menu (⋮) and choose "Translate…".',
				'Computer: right-click anywhere on the page and choose "Translate to…".'
			]
		},
		{
			key: 'safari',
			name: 'Safari (iPhone, iPad, Mac)',
			steps: [
				'iPhone or iPad: tap the page menu (aA) in the address bar and choose "Translate to…".',
				'Mac: click the translate icon in the address bar, or go to View > Translation.'
			]
		},
		{
			key: 'edge',
			name: 'Microsoft Edge',
			steps: [
				'Click the translate icon in the address bar, or right-click the page and choose "Translate to…".'
			]
		},
		{
			key: 'firefox',
			name: 'Firefox',
			steps: [
				'Click the translate icon in the address bar, or open the menu (☰) and choose "Translate page…".'
			]
		},
		{
			key: 'samsung',
			name: 'Samsung Internet',
			steps: ['Tap the menu (☰) and choose "Translate".']
		}
	]
	let detected = ''
	let open = false
	let wrapper: HTMLDivElement

	const detectBrowser = (ua: string) => {
		if (ua.includes('SamsungBrowser')) return 'samsung'
		if (ua.includes('Edg/') || ua.includes('EdgA/') || ua.includes('EdgiOS/')) return 'edge'
		if (ua.includes('Firefox/') || ua.includes('FxiOS/')) return 'firefox'
		if (ua.includes('Chrome/') || ua.includes('CriOS/')) return 'chrome'
		if (ua.includes('Safari/')) return 'safari'
		return ''
	}

	onMount(() => {
		detected = detectBrowser(navigator.userAgent)
		// Show the visitor's browser first
		browsers = [
			...browsers.filter((b) => b.key === detected),
			...browsers.filter((b) => b.key !== detected)
		]
	})

	const closeOnOutsideClick = (e: MouseEvent) => {
		if (open && wrapper && !wrapper.contains(e.target as Node)) open = false
	}
</script>

<svelte:window
	on:click={closeOnOutsideClick}
	on:keydown={(e) => {
		if (e.key === 'Escape') open = false
	}}
/>

<div class="translate-menu relative h-full flex-shrink-0" bind:this={wrapper}>
	<button
		class="translate-button flex h-full items-center justify-center gap-1 px-3 transition-all"
		class:selected={open}
		aria-expanded={open}
		aria-controls="translate-panel"
		aria-label="Translate this page"
		title="Translate this page"
		on:click={() => {
			open = !open
		}}
	>
		<DynamicIcon selected={open} icon={translate_icon}></DynamicIcon>
		<span class="hidden text-sm md:inline">Translate</span>
	</button>
	{#if open}
		<div
			id="translate-panel"
			class="translate-panel fixed inset-x-2 top-14 z-[1000] max-h-[70vh] overflow-y-auto rounded-lg p-4 shadow-lg md:top-16 lg:absolute lg:inset-x-auto lg:left-0 lg:top-full lg:mt-2 lg:w-[22rem]"
		>
			<h4 class="mb-1 text-lg">Translate this page</h4>
			<p class="mb-3 text-sm">
				Your web browser can translate this website into your language. Find your browser below.
			</p>
			<ul class="flex flex-col gap-3">
				{#each browsers as browser (browser.key)}
					<li class="browser rounded p-3" class:detected={browser.key === detected}>
						<p class="browser-name font-bold">
							{browser.name}
							{#if browser.key === detected}
								<span class="your-browser ml-1 rounded-full px-2 py-0.5 text-xs">Your browser</span>
							{/if}
						</p>
						<ul class="mt-1 list-disc pl-5 text-sm">
							{#each browser.steps as step}
								<li>{step}</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.translate-button {
		color: var(--theme-text-blue);
		border-left: 1px solid var(--theme-text-blue);
		font-family: var(--theme-font-title-2);
		font-weight: 700;
	}
	.translate-button.selected {
		background-color: var(--theme-text-green);
		color: var(--theme-colour-1);
	}
	.translate-panel {
		color: var(--theme-colour-3);
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-text-blue);
		font-family: var(--theme-font-paragraph);
	}
	h4 {
		color: var(--theme-text-blue);
		font-family: var(--theme-font-title-2);
		font-weight: 700;
	}
	.browser {
		background-color: var(--theme-colour-2);
	}
	.browser.detected {
		outline: 2px solid var(--theme-text-green);
	}
	.your-browser {
		color: var(--theme-colour-1);
		background-color: var(--theme-text-green);
	}
</style>
