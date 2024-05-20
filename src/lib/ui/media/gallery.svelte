<script lang="ts">
	import { page } from '$app/stores'
	import type { CardsFile } from '$lib/types'
	import { Picture, getId } from '@arturoguzman/art-ui'
	export let media: CardsFile[] | null
	export let category: string
	let current_visible_element = 0
	const local_id = getId()
	const createObserver = (e: HTMLElement) => {
		const elems = `.gallery-child-${local_id}`
		const root_el = `gallery-${local_id}`
		const observer = new IntersectionObserver(
			(es) => {
				es.forEach((e, i) => {
					if (e.isIntersecting && e.intersectionRatio >= 0) {
						// tracker.innerHTML = e.target.getAttribute('data-observe') ?? String(i)
						current_visible_element = Number(e.target.getAttribute('data-observe')) ?? i
					}
				})
			},
			{
				root: document.getElementById(root_el ?? 'theme-wrapper'),
				threshold: 0.9
			}
		)
		const to_observe = document.querySelectorAll(elems)
		for (const el of to_observe) {
			observer.observe(el)
		}
	}
	const files =
		media?.map((m) => {
			if (
				m &&
				typeof m !== 'string' &&
				m.directus_files_id &&
				typeof m.directus_files_id !== 'string'
			) {
				return m.directus_files_id
			}
		}) || []
</script>

<div
	data-gallery={media && media.length > 1 ? 'true' : undefined}
	id="gallery-{local_id}"
	class="gallery-card flex snap-x snap-mandatory gap-4 overflow-y-hidden overflow-x-scroll"
>
	{#if files && files.length > 0}
		{#each files as m, i}
			<!-- {@const custom_class = m.height > m.width ? 'w-full' : 'h-full'} -->
			{#if m && m.type?.includes('image')}
				<div
					class:-scale-x-100={$page.data.side === 'right' && category === 'all'}
					id="gallery-child-{local_id}-{i + 1}"
					data-observe={i + 1}
					class="gallery-child gallery-child-{local_id} relative flex w-full flex-shrink-0 snap-center items-center justify-center"
				>
					<!-- <img src="/assets/{m.id}" /> -->
					<Picture fit="contain" image={m}></Picture>
				</div>
			{:else}
				<div class="flex h-64 w-full items-center justify-center bg-slate-300 font-mono">
					<p class="-rotate-45">insert image here</p>
				</div>
			{/if}
		{/each}
	{:else}
		<div class="flex h-64 w-full items-center justify-center bg-slate-300 font-mono">
			<p class="-rotate-45">insert image here</p>
		</div>
	{/if}
</div>
{#if media && media.length > 1}
	<div class="number-indicator absolute bottom-2 right-2 flex gap-1 rounded-full px-4">
		<p class="" use:createObserver></p>
		<p>{current_visible_element} of {media.length}</p>
	</div>
{/if}

{#if files.length > 1}
	<button
		class="gallery-previous-button gallery-button absolute left-2 top-2 bg-white"
		class:hidden={current_visible_element <= 1}
		on:click={() => {
			const gallery = document.getElementById(
				`gallery-child-${local_id}-${current_visible_element - 1}`
			)
			gallery?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-arrow-left"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#44B3CE"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l14 0" />
			<path d="M5 12l6 6" />
			<path d="M5 12l6 -6" />
		</svg>
	</button>
	<button
		class="gallery-next-button gallery-button absolute right-2 top-2"
		class:hidden={current_visible_element >= files?.length}
		on:click={() => {
			const gallery = document.getElementById(
				`gallery-child-${local_id}-${current_visible_element + 1}`
			)
			gallery?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
		}}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-arrow-right"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#44B3CE"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l14 0" />
			<path d="M13 18l6 -6" />
			<path d="M13 6l6 6" />
		</svg></button
	>
{/if}

<style>
	.gallery-card[data-gallery]:hover {
		scrollbar-width: thin;
	}
	.gallery-card {
		max-height: 50lvh;
	}
	.number-indicator {
		color: var(--theme-colour-3);
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-3);
	}
	.gallery-button {
		opacity: 0;
		pointer-events: none;
	}
	@media (min-width: 1024px) {
		.gallery-button {
			pointer-events: initial;
			opacity: 0.2;
			background: var(--theme-colour-1);
			border: 1px solid var(--theme-colour-3);
			border-radius: 0.6rem;
			padding: 0 1rem;
			transition: all 0.3s ease-in-out;
		}
		.gallery-button:hover {
			opacity: 1;
		}
		.gallery-card:hover ~ .gallery-button {
			opacity: 1;
		}
	}
</style>
