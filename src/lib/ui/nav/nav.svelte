<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '../button/button.svelte'
	import SearchBar from '../search/search_bar.svelte'
	import NavTopics from './nav_topics.svelte'
	export let copy: string
	export let navigating: boolean
	// let navigating = true
	let windowWidth = 0
	const openDialog = () => {
		const dialog = document.getElementById('dialog-change-side') as HTMLDialogElement
		dialog.showModal()
	}
	let search_bar_open = false
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav
	class="z-50 grid h-14 w-full transition-all md:h-16 lg:grid-cols-[minmax(0,4fr),minmax(0,9fr)]"
	class:grid-cols-[minmax(0,1fr)]={!$page.params.slug}
	class:grid-cols-[minmax(0,7fr),minmax(0,1fr)]={$page.params.slug && !search_bar_open}
	class:grid-cols-[minmax(0,0fr),minmax(0,1fr)]={$page.params.slug && search_bar_open}
	class:navigating
>
	<div
		class="nav-left-col flex items-center lg:col-span-1 lg:col-start-1 {$page.params.slug &&
			search_bar_open &&
			'hidden lg:flex'}"
	>
		<button
			class="etips-button bg-red flex h-full w-full items-center justify-center px-4 lg:px-0"
			on:click={() => {
				goto(`/`)
			}}
		>
			<img src="/favicon.png" alt="etips logo" class="w-32 mix-blend-multiply" />
		</button>
		{#if !$page.url.pathname.includes('pages')}
			<div
				class="side-title relative flex h-full w-full items-center justify-center px-4 lg:text-lg"
				class:hidden={copy === ''}
				class:side-title-border={$page.params.slug}
			>
				<button
					disabled={$page.data.role === 'public' ? true : undefined}
					class="absolute"
					on:click={() => {
						if ($page.data.role !== 'public') openDialog()
					}}
					>{copy}
				</button>
			</div>
		{/if}
	</div>
	<div
		class="nav-right-col col-span-1 col-start-2 flex items-center justify-end transition-all lg:justify-normal"
		class:hidden={!$page.params.slug}
	>
		{#if !search_bar_open}
			<div class="nav-wrapper hidden w-full lg:block">
				{#if $page.params.slug && !$page.params.topic && $page.data.page}
					<h3 class="content-desktop-header px-8 text-center text-2xl">
						{#if !$page.url.pathname.includes('pages')}Available topics in{/if}<strong
							style="color: var(--theme-colour-3)">{$page.data.page.title}</strong
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
		{/if}
		{#if $page.data.page}
			<SearchBar bind:search_bar_open></SearchBar>
		{/if}
		<!-- <div class="nav-left-border h-full lg:hidden"> -->
		<!-- 	<Button -->
		<!-- 		on:click={() => { -->
		<!-- 			goto('/access') -->
		<!-- 		}} -->
		<!-- 		label="Enter" -->
		<!-- 	></Button> -->
		<!-- </div> -->
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
		bottom: 0;
		left: 0;
		width: 100%;
		height: 35%;
		border-radius: 999px;
		/* filter: blur(10px); */
		filter: blur(10px);
		content: '';
		background-color: color-mix(in oklab, var(--theme-colour-4) 60%, var(--theme-colour-1) 80%);
		animation: loading 2.5s ease-in-out infinite forwards;
	}
	@keyframes loading {
		0% {
			height: 0%;
			left: -80%;
			opacity: 0;
			width: 0%;
			background-color: color-mix(in oklab, var(--theme-colour-6) 60%, var(--theme-colour-1) 30%);
		}
		25% {
			height: 25%;
			width: 50%;
			opacity: 1;
		}
		45% {
			left: 100%;
			opacity: 0;
			width: 300%;
			background-color: color-mix(in oklab, var(--theme-colour-5) 60%, var(--theme-colour-1) 10%);
		}
		46% {
			height: 15%;
			left: -40%;
			opacity: 0;
			width: 20%;
		}
		65% {
			opacity: 1;
			background-color: color-mix(in oklab, var(--theme-colour-6) 100%, var(--theme-colour-1) 80%);
		}
		/* 75% { */
		/* 	width: 60%; */
		/* 	background-color: color-mix(in oklab, var(--theme-colour-5) 60%, var(--theme-colour-1) 10%); */
		/* } */
		80% {
			left: 120%;
			width: 100%;
			background-color: color-mix(in oklab, var(--theme-colour-5) 60%, var(--theme-colour-1) 10%);
		}
		100% {
			height: 5%;
			opacity: 0;
			left: 200%;
		}
	}
</style>
