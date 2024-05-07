<script lang="ts">
	import type { Page } from '$lib/types'
	import { createEventDispatcher } from 'svelte'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	import { page } from '$app/stores'
	export let pages: Page[]
	const dispatch = createEventDispatcher()
</script>

<!-- NOTE:Need to enable dynamic colours, fix loading colours only on mount?? -->

<nav class="sticky left-0 top-0 z-50 flex h-12 w-full md:h-16">
	{#each pages as active_page}
		{#if active_page.category === 'restricted'}
			<button
				class="pages-nav-button flex aspect-square h-full items-center justify-center"
				class:selected={$page.params.slug === active_page.slug}
				data-title={active_page.title}
				on:click={() => {
					dispatch('click', active_page.slug)
				}}
			>
				<DynamicIcon
					selected={$page.params.slug === active_page.slug}
					icon={active_page.icon}
					stroke={1.5}
				></DynamicIcon>
			</button>
		{/if}
	{/each}
</nav>

<style>
	nav {
		background-color: var(--theme-colour-1);
		border-bottom: 1px solid var(--theme-colour-4);
	}
	.pages-nav-button {
		background-color: var(--theme-colour-1);
		border-right: 1px solid var(--theme-colour-4);
		position: relative;
		transition: all 0.3 ease-in-out;
	}
	/* .pages-nav-button:hover::after { */
	/* 	content: attr(data-title); */
	/* 	width: calc(100vw - 4rem); */
	/* 	position: absolute; */
	/* 	font-size: 0.8rem; */
	/* 	bottom: -2rem; */
	/* 	left: 2px; */
	/* 	background-color: var(--theme-colour-2); */
	/* 	padding: 0 1rem; */
	/* 	border-radius: 1rem; */
	/* 	text-transform: capitalize; */
	/* 	border: 1px solid var(--theme-colour-4); */
	/* 	z-index: 999; */
	/* } */
	.selected {
		background-color: var(--theme-colour-6);
	}
</style>
