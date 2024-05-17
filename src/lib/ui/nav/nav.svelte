<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '../button/button.svelte'
	import SearchBar from '../search/search_bar.svelte'
	import NavTopics from './nav_topics.svelte'
	//TODO:dynamically set copy
	$: copy = $page.params.slug ? 'Best from the Left' : 'Welcome'
	let windowWidth = 0
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav
	class="grid-cols[minmax(0,3fr),minmax(0,1fr)] z-50 grid h-12 w-full md:h-16 lg:grid-cols-[minmax(0,4fr),minmax(0,9fr)]"
>
	<div class="nav-left-col flex items-center lg:col-span-1 lg:col-start-1">
		<button
			class="etips-button flex h-full w-full items-center justify-center px-4 lg:px-0"
			on:click={() => {
				goto(`/`)
			}}
		>
			<img src="/favicon.png" alt="etips logo" class=" w-32" />
		</button>
		<div
			class="side-title flex h-full w-full items-center px-4 text-sm lg:justify-center lg:text-lg"
			class:hidden={copy === ''}
			class:side-title-border={$page.params.slug}
		>
			<p>{copy}</p>
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
				<NavTopics
					on:click={(e) => {
						goto(`/${$page.params.slug}/${e.detail}`)
					}}
					topics={$page.data.topics}
				></NavTopics>
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
	nav {
		background-color: var(--theme-colour-1);
		/* grid-template-columns: minmax(0, 3fr) minmax(0, 1fr); */
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
</style>
