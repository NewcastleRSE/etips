<script lang="ts">
	import type { Card } from '$lib/types'
	import CardText from './card_text.svelte'
	import Gallery from '$lib/ui/media/gallery.svelte'
	import Vimeo from '../media/vimeo.svelte'
	import CardVideo from './card_video.svelte'
	import CardFile from './card_file.svelte'
	import CardYoutube from './card_youtube.svelte'
	export let card: Card
	export let display: string = 'cards'
	export let direction: 'horizontal' | 'vertical' = 'vertical'
</script>

<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class:gap-4={card.media_type !== 'file'}
	class="media-card flex flex-col p-4 lg:p-8"
	id={card.id}
>
	<div
		class="media-card-left-col relative"
		class:horizontal={direction === 'horizontal'}
		class:vertical={direction === 'vertical'}
	>
		{#if card.media_type === 'photo'}
			<Gallery category={card.category} media={card.media}></Gallery>
		{/if}
		{#if card.media_type === 'video'}
			<CardVideo {card}></CardVideo>
		{/if}
		{#if card.media_type === 'file'}
			<CardFile {card}></CardFile>
		{/if}
		{#if card.media_type === 'youtube'}
			<CardYoutube {card}></CardYoutube>
		{/if}
		{#if card.media_type === 'vimeo'}
			<Vimeo video_id={card.url?.replaceAll('https://vimeo.com/', '')}></Vimeo>
		{/if}
	</div>
	<div class="media-card-right-col">
		{#if card.media_type !== 'file'}
			<CardText nested {card}></CardText>
		{/if}
	</div>
</div>

<style>
	.card-list {
		background-color: var(--theme-colour-1);
		border-top: 1px solid var(--theme-colour-5);
	}
	.media-card {
		animation: appear 0.3s ease-in-out forwards;
	}
	@keyframes appear {
		0% {
			transform: translate(0%, -5%);
			opacity: 0;
		}
		100% {
			opacity: 1;
			transform: translate(0%, 0%);
		}
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
