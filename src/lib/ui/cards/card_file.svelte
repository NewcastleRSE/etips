<script lang="ts">
	import type { Card } from '$lib/types'
	import { Picture } from '@arturoguzman/art-ui'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	export let card: Card
	let cursorX = 0
	let cursorY = 0
	let hover = false
	const download_icon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-download" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M12 17v-6" />
  <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
</svg>`
</script>

{#if card.media}
	{#each card.media as media}
		<!-- <pre>{JSON.stringify(card, null, 2)}</pre> -->
		{#if media.directus_files_id && typeof media.directus_files_id !== 'string'}
			<a
				href="/assets/{media.directus_files_id.id}"
				download
				class="file-download grid grid-cols-1 grid-rows-[minmax(0,1fr)] gap-8 overflow-hidden"
				style:--cursor-x="{cursorX}px"
				style:--cursor-y="{cursorY}px"
				on:pointerenter={() => {
					hover = true
				}}
				on:pointerleave={() => {
					hover = false
				}}
			>
				{#if card.thumbnail}
					<Picture image={card.thumbnail}></Picture>
					<!-- {card.thumbnail} -->
					<!-- <img src="/assets/{card.thumbnail}" class="h-64 p-4" alt="" /> -->
					<!-- <Picture alt="a" image={card.thumbnail}></Picture> -->
				{/if}
				<div class="flex items-center justify-start gap-1 md:gap-4">
					<div class="md:hidden">
						<DynamicIcon icon={download_icon} size={24}></DynamicIcon>
					</div>
					<div class="hidden md:block">
						<DynamicIcon icon={download_icon} size={48}></DynamicIcon>
					</div>

					<p class="text-sm md:text-lg">
						{hover ? 'Click to download' : media.directus_files_id.title}
					</p>
				</div>
			</a>
		{/if}
	{/each}
{/if}

<style>
	.file-download {
		font-family: var(--theme-font-title);
	}
	.file-download {
		color: var(--theme-colour-3);
		font-family: var(--theme-font-title-1);
		font-weight: 500;
	}
	/* .file-download::after { */
	/* 	transition: all 0.3s ease-in-out; */
	/* 	opacity: 0; */
	/* 	content: 'Click to download'; */
	/* 	position: fixed; */
	/* 	background: var(--theme-colour-1); */
	/* 	border: 1px solid var(--theme-colour-3); */
	/* 	border-radius: 9999px; */
	/* 	padding: 0 1rem; */
	/* 	top: 1rem; */
	/* 	left: 50%; */
	/* 	top: 50%; */
	/* 	transform: translate(-50%, -50%); */
	/* 	width: 80%; */
	/* 	text-align: center; */
	/* } */
	/* .file-download:hover::after { */
	/* 	opacity: 1; */
	/* 	content: 'Click to download'; */
	/* } */
</style>
