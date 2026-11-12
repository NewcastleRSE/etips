<script lang="ts">
	import { env } from '$env/dynamic/public'
	import type { Card } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import { Picture } from '@arturoguzman/art-ui'
	export let card: Card
	let video_enabled = false

	// MP4 (H.264/AAC) first as every browser can play it. Was currently running into an issue where Safari picks the first type it
	// thinks it supports and won't fall back if a WebM then fails to decode which just results in a bad quality video
	$: sources = (card.media ?? [])
		.map((m) => m.directus_files_id)
		.filter(
			(f): f is DirectusFile =>
				!!f && typeof f !== 'string' && !!f.id && !!f.type && f.type.includes('video')
		)
		.sort((a, b) => Number(b.type === 'video/mp4') - Number(a.type === 'video/mp4'))
</script>

{#if card.media && card.thumbnail}
	<div class="card-video-container relative aspect-video w-full">
		{#if !video_enabled}
			<button
				aria-label="Play video: {card.title ?? ''}{card.transcript
					? '. A transcript is below the video.'
					: ''}"
				class="card-video-thumbnail-button absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 p-12"
				on:click={() => {
					video_enabled = true
				}}
			>
				<div class="card-video-thumbnail h-full w-full blur-sm">
					<Picture fit="contain" image={card.thumbnail}></Picture>
				</div>
				<!-- <img class="object-cover" src="/assets/{card.thumbnail}" alt="" /> -->
				<div class="play-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-player-play-filled"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#00bfd8"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
							stroke-width="0"
							fill="#013A67"
						/>
					</svg>
				</div>
			</button>
		{:else}
			<video
				controls
				autoplay
				playsinline
				aria-label="Video: {card.title ?? ''}{card.transcript ? ' (transcript below)' : ''}"
			>
				<track kind="captions" />
				{#each sources as file}
					<source src={`${env.PUBLIC_CMS_ENDPOINT}/assets/${file.id}`} type={file.type} />
				{/each}
			</video>
		{/if}
	</div>
{/if}

<style>
	.card-video-thumbnail-button {
		border: 1px solid var(--theme-text-blue);
		border-radius: 1rem;
		box-shadow: 2px 2px 10px
			color-mix(in oklab, var(--theme-colour-6) 40%, var(--theme-colour-1) 90%);
	}
</style>
