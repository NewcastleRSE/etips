<script lang="ts">
	import type { Topic } from '$lib/types'
	import SearchCard from './search_card.svelte'
	export let results: Record<string, Topic[]>
	export let query: string
	const keys = Object.keys(results)
	const getWidth = (e: HTMLElement, key: string) => {
		e.style.width = `${results[key].length * (results[key].length === 1 ? 16 : 16 / 2)}rem`
	}
</script>

<div class="search-result-page items relative h-full overflow-x-hidden p-6">
	{#if keys.length > 0}
		{#each keys as key}
			<div class="search-result-page-container my-6 overflow-y-scroll p-4 first-of-type:mt-12">
				<h3 class="mb-2 text-xl md:text-2xl">{key}</h3>
				<div
					use:getWidth={key}
					class="search-cards-container flex max-h-64 flex-col flex-wrap items-start gap-2"
				>
					{#each results[key] as topic}
						<SearchCard {query} {topic}></SearchCard>
					{/each}
				</div>
			</div>
		{/each}
	{:else}
		<p class="search-no-results absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			There are no results for {query ? query : 'this search'}, please try another term!
		</p>
	{/if}
</div>

<style>
	.search-result-page-container {
		border: 1px solid var(--theme-colour-5);
		border-radius: 1rem;
		background-color: var(--theme-colour-1);
		color: var(--theme-colour-3);
	}
	.search-no-results {
		color: var(--theme-colour-3);
		font-family: var(--theme-font-paragraph);
	}
</style>
