<script lang="ts">
	import { PUBLIC_CMS_ENDPOINT } from '$env/static/public'
	import type { Card } from '$lib/types'
	import { Picture } from '@arturoguzman/art-ui'
	export let card: Card
	let video_enabled = false
</script>

{#if card.media && card.thumbnail}
	<div class="card-video-container relative aspect-video w-full">
		{#if !video_enabled}
			<button
				class="card-video-thumbnail-button absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 p-12"
				on:click={() => {
					video_enabled = true
				}}
			>
				<div class="card-video-thumbnail h-full w-full blur-sm">
					<Picture image={card.thumbnail}></Picture>
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
			<video controls autoplay playsinline>
				<track kind="captions" />
				{#each card.media as m}
					{@const file = m.directus_files_id}
					{#if file && typeof file !== 'string' && file.id && file.type && file.type.includes('video')}
						<source src={`${PUBLIC_CMS_ENDPOINT}/assets/${file.id}`} type={file.type} />
					{/if}
				{/each}
			</video>
		{/if}
	</div>
{/if}

<style>
	.card-video-thumbnail-button {
		border: 1px solid var(--theme-colour-4);
		border-radius: 1rem;
		box-shadow: 2px 2px 10px
			color-mix(in oklab, var(--theme-colour-6) 40%, var(--theme-colour-1) 90%);
	}
</style>
