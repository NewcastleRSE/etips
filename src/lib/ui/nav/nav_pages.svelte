<script lang="ts">
	import { page } from '$app/stores'
	import type { Page } from '$lib/types'
	import NavPagesButton from './nav_pages_button.svelte'
	export let direction = 'horizontal'
	export let pages: Page[]
</script>

<!-- NOTE:Need to enable dynamic colours, fix loading colours only on mount?? -->

<nav class="sticky left-0 top-0 z-50 flex {direction} w-screen lg:w-full">
	{#each pages as page_button}
		{#if page_button.category === 'restricted' || (page_button.category === 'restricted_hcp' && $page.data.role === 'healthcare-professional')}
			<NavPagesButton {page_button} {direction}></NavPagesButton>
		{/if}
	{/each}
</nav>

<style>
	nav {
		background-color: var(--theme-colour-1);
	}
	.horizontal {
		height: 3rem;
		width: 100%;
		border-bottom: 1px solid var(--theme-colour-4);
	}
	.vertical {
		height: 100%;
		width: 3rem;
		/* overflow: hidden; */
		flex-direction: column;
		border-right: 1px solid var(--theme-colour-4);
	}
	@media (min-width: 768px) {
		.horizontal {
			height: 4rem;
		}
		.horizontal:hover {
			scrollbar-width: thin;
		}
		.vertical {
			width: 100%;
			max-width: 8rem;
		}
	}
	.selected {
		background-color: var(--theme-colour-6);
	}
</style>
