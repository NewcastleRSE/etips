<script lang="ts">
	import { page } from '$app/stores'
	import type { Topic } from '$lib/types'
	import SearchCard from './search_card.svelte'
	export let results: Record<string, Topic[]>
	export let query: string
	const keys = Object.keys(results)
</script>

<div class="search-result-page px-6">
	{#if keys.length > 0}
		{#each keys as key}
			<div class="search-result-page-container my-6 py-3 pl-12 first-of-type:mt-12">
				<h3 class="mb-2 text-xl md:text-2xl">{key}</h3>
				<div
					class="search-cards-container flex max-h-64 flex-col flex-wrap gap-2 overflow-y-scroll"
				>
					{#each results[key] as topic}
						<SearchCard {query} {topic}></SearchCard>
					{/each}
				</div>
			</div>
		{/each}
	{:else}
		<p>
			There are no results for {query ? query : 'this search'} :(
		</p>
	{/if}
</div>

<style>
	.search-result-page {
	}
	.search-result-page-container {
		border: 1px solid var(--theme-colour-5);
		border-radius: 1rem;
		/* background-color: color-mix(in oklab, var(--theme-colour-1) 100%, var(--theme-colour-3) 3%); */
		background-color: var(--theme-colour-1);
		color: var(--theme-colour-3);
	}
</style>
