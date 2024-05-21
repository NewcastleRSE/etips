<script lang="ts">
	import type { Card } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import CardText from './card_text.svelte'
	import Gallery from '$lib/ui/media/gallery.svelte'
	import Vimeo from '../media/vimeo.svelte'
	import CardVideo from './card_video.svelte'
	import { goto } from '$app/navigation'
	import { side } from '$lib/stores/layout'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	import { page } from '$app/stores'
	export let card: Card
	export let display: string = 'cards'
	export let direction: 'horizontal' | 'vertical' = 'vertical'
	const download_icon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-download" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M12 17v-6" />
  <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
</svg>`
	let cursorX = 0
	let cursorY = 0
</script>

<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class="media-card flex flex-col gap-4 p-4 lg:p-8"
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
			<CardVideo media={card.media}></CardVideo>
		{/if}
		{#if card.media_type === 'file'}
			{#if card.media}
				{#each card.media as media}
					{#if media.directus_files_id && typeof media.directus_files_id !== 'string'}
						<a
							href="/assets/{media.directus_files_id.id}"
							download
							class="file-download flex items-center gap-4"
							style:--cursor-x="{cursorX}px"
							style:--cursor-y="{cursorY}px"
							on:pointermove={(e) => {
								cursorX = e.layerX
								cursorY = e.layerY
							}}
						>
							<DynamicIcon icon={download_icon} size={48}></DynamicIcon>
							<p>{media.directus_files_id.title}</p>
						</a>
					{/if}
				{/each}
			{/if}
		{/if}

		{#if card.media_type === 'youtube'}
			<iframe
				src={card.url?.replaceAll(
					'https://www.youtube.com/watch?v=',
					'https://www.youtube-nocookie.com/embed/'
				)}
				title={card.title ?? ''}
				class="aspect-video w-full"
			></iframe>
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
	.file-download {
		color: var(--theme-colour-3);
		font-family: var(--theme-font-title-1);
		font-weight: 500;
		position: relative;
	}
	.file-download:hover::after {
		content: 'Click to download';
		position: absolute;
		background: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-3);
		border-radius: 9999px;
		padding: 0 1rem;
		top: var(--cursor-y);
		left: var(--cursor-x);
	}
</style>
