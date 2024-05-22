<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '../button/button.svelte'
	import SearchBar from '../search/search_bar.svelte'
	import NavTopics from './nav_topics.svelte'
	export let copy: string
	export let navigating: boolean
	let windowWidth = 0
	const openDialog = () => {
		const dialog = document.getElementById('dialog-change-side') as HTMLDialogElement
		dialog.showModal()
	}
	// onMount(() => {
	// 	openDialog()
	// })
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav
	class="grid-cols[minmax(0,3fr),minmax(0,1fr)] z-50 grid h-12 w-full md:h-16 lg:grid-cols-[minmax(0,4fr),minmax(0,9fr)]"
>
	<div class="nav-left-col flex items-center lg:col-span-1 lg:col-start-1" class:navigating>
		<button
			class="etips-button bg-red flex h-full w-full items-center justify-center px-4 lg:px-0"
			on:click={() => {
				goto(`/`)
			}}
		>
			<img src="/favicon.png" alt="etips logo" class="w-32 mix-blend-multiply" />
		</button>
		<div
			class="side-title relative flex h-full w-full items-center px-4 text-sm lg:justify-center lg:text-lg"
			class:hidden={copy === ''}
			class:side-title-border={$page.params.slug}
		>
			<button
				class="absolute"
				on:click={() => {
				}}
				>{copy}
			</button>
		</div>
	</div>
	<div
		class="nav-right-col col-start-2 flex items-center justify-end transition-all lg:justify-normal"
	>
		{#if windowWidth > 1024}
			<div class="nav-wrapper hidden w-full lg:block">
				{#if $page.params.slug && !$page.params.topic}
					<h3 class="content-desktop-header px-8 text-center text-2xl">
						Available topics in <strong style="color: var(--theme-colour-3)"
							>{$page.data.page.title}</strong
						>
					</h3>
				{/if}
				{#if $page.params.slug && $page.params.topic}
					<NavTopics
						on:click={(e) => {
							goto(`/${$page.params.slug}/${e.detail}`)
						}}
						topics={$page.data.topics}
					></NavTopics>
				{/if}
			</div>
			<SearchBar></SearchBar>
			<div class="nav-left-border h-full lg:hidden">
				<Button
					on:click={() => {
						goto('/access')
					}}
					label="Enter"
				></Button>
			</div>
		{/if}
	</div>
</nav>

<style>
	.nav-left-col {
		border-bottom: var(--theme-colour-3);
	}
	nav {
		background-color: var(--theme-colour-1);
		border-bottom: 1px solid var(--theme-colour-4);
	}
	.nav-left-border {
		border-left: 1px solid var(--theme-colour-4);
	}
	.side-title {
		color: var(--theme-colour-4);
		font-family: var(--theme-font-title);
	}
	.etips-button {
		border-right: 1px solid var(--theme-colour-4);
	}
	.content-desktop-header {
		font-family: var(--theme-font-title-2);
		font-weight: 700;
		color: var(--theme-colour-4);
	}

	@media (min-width: 1024px) {
		.side-title {
			border-right: 1px solid var(--theme-colour-4);
		}
		.side-title-border {
			border-right: 3px solid var(--theme-colour-4);
		}
	}
	.navigating {
		background-color: var(--theme-colour-1);
		position: relative;
		overflow: hidden;
	}
	.navigating::before {
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* border-radius: 999px; */
		/* filter: blur(10px); */
		content: '';
		background-color: color-mix(in oklab, var(--theme-colour-4) 60%, var(--theme-colour-1) 80%);
		animation: loading 3s ease-in-out infinite forwards;
	}
	@keyframes loading {
		0% {
			left: -120%;
			opacity: 1;
			width: 0%;
			background-color: color-mix(in oklab, var(--theme-colour-4) 60%, var(--theme-colour-1) 80%);
		}
		25% {
			width: 50%;
			background-color: color-mix(in oklab, var(--theme-colour-5) 100%, var(--theme-colour-1) 20%);
		}
		50% {
			left: 120%;
			opacity: 0;
			width: 100%;
			background-color: color-mix(in oklab, var(--theme-colour-6) 60%, var(--theme-colour-1) 80%);
		}
		51% {
			left: -100%;
			opacity: 0;
			width: 0%;
		}
		52% {
			opacity: 1;
			width: 0%;
		}
		75% {
			width: 50%;
			background-color: color-mix(in oklab, var(--theme-colour-6) 100%, var(--theme-colour-1) 80%);
		}
		95% {
			left: 120%;
			opacity: 0;
			width: 0%;
		}
		100% {
			left: 200%;
			background-color: color-mix(in oklab, var(--theme-colour-4) 60%, var(--theme-colour-1) 80%);
		}
	}
</style>
