<script lang="ts">
	import type { Card } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import CardText from './card_text.svelte'
	export let card: Card
	export let display: string
	$: media = card.media.reduce((acc: DirectusFile[], m) => {
		if (m && m.directus_files_id && typeof m.directus_files_id !== 'string') {
			const file = m.directus_files_id
			acc.push(file)
		}
		return acc
	}, [])
</script>

<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class="media-card flex flex-col gap-2 p-4 md:grid md:grid-cols-2 md:grid-rows-1 md:p-8"
>
	<!-- <CardText {card}></CardText> -->
	<div class="media-card-left-col bg-black">
		{#each media as m}
			<!-- TODO: add assets endpoint! -->
			<img src="/assets/{m.id}" alt="" />
		{:else}
			<p class="h-64">insert image here</p>
		{/each}
	</div>
	<div class="media-card-right-col">
		<CardText nested {card}></CardText>
	</div>
</div>

<style>
	.card-list {
		background-color: var(--theme-colour-1);
		border-top: 1px solid var(--theme-colour-5);
	}
	.card-list:nth-child(1) {
		border-top: none;
	}
	.card-list:last-child {
		border-bottom: 1px solid var(--theme-colour-5);
	}
	.card-continuous {
		margin: 1.5rem 0;
	}
	.card-cards {
		margin: 1rem 0;
		border-radius: 0.5rem;
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-5);
	}
</style>
