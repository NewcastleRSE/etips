<script lang="ts">
	import type { Card, Topic } from '$lib/types'
	import Button from '../button/button.svelte'
	import { goto } from '$app/navigation'
	export let topic: Topic
	export let query: string
	const removeTags = (str: string) => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, ' ')
	const sectionString = (str: string, query: string, start: number, buffer: number) => {
		const result = str
			.substring(start - 20, start + buffer)
			.replaceAll(new RegExp(query, 'gi'), `<mark>${query}</mark>`)
		if (result === '') {
			return null
		}
		return `...${result}${result.at(-1) === '.' ? '' : '...'}`
	}
	const findSearch = (card: Card, query: string | null, limit: number, buffer: number) => {
		const str = card.copy ?? card.subtitle
		if (!str || !query) {
			return []
		}
		const clean_string = removeTags(str)
		const regex = new RegExp(query, 'gi')
		let matches = 0
		let match: RegExpExecArray | null = null
		let lines = []
		while ((match = regex.exec(clean_string)) !== null && matches < limit) {
			lines.push(match.index)
			matches++
		}
		return lines
			.flatMap((st) => sectionString(clean_string, query, st, buffer))
			.filter((st) => st !== null)
	}
</script>

{#if topic.cards}
	<div class="search-topic-card w-64 flex-shrink-0 lg:w-96">
		<h3 class="mb-2 overflow-hidden text-ellipsis text-nowrap">{topic.title}</h3>
		<div class="results-container">
			{#each topic.cards as card_id}
				{@const card = card_id.cards_id}
				<div class="search-result-cards mb-4 flex flex-col gap-4 text-xs last-of-type:mb-0">
					{#if card && typeof card !== 'string'}
						{@const results = findSearch(card, query, 2, 80)}
						{#if results.length > 0}
							{#each results as result}
								<!-- <Button -->
								<!-- 	on:click={() => { -->
								<!-- 		if (topic.category && typeof topic.category !== 'string') -->
								<!-- 			goto(`/${topic.category.slug}/${topic.slug}#${card.id}`) -->
								<!-- 	}} -->
								<!-- > -->
								<!-- 	{@html result} -->
								<!-- </Button> -->
								<button
									class="result-button mb-4 w-full text-left last-of-type:mb-0"
									on:click={() => {
										if (topic.category && typeof topic.category !== 'string')
											goto(`/${topic.category.slug}/${topic.slug}?query=${query}#${card.id}`)
									}}
								>
									{@html result}
								</button>
							{/each}
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.search-topic-card {
		/* border: 1px solid var(--theme-colour-4); */
		/* border-radius: 0.5rem; */
		border-right: 3px solid var(--theme-colour-1);
		/* background-color: var(--theme-colour-1); */
	}
	.results-container {
		border: 1px dotted var(--theme-colour-6);
		border-radius: 0.5rem;
		padding: 0.8rem;
		background-color: var(--theme-colour-1);
		overflow: scroll;
		max-height: 12rem;
	}
	.result-button {
		border: 1px solid var(--theme-colour-5);
		border-radius: 999px;
		padding: 0.2rem 0.6rem;
	}
</style>
