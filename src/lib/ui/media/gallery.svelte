<script lang="ts">
	import type { CardsFile } from '$lib/types'
	import { loadObserver } from '$lib/utils/observer'
	import { Picture, getId } from '@arturoguzman/art-ui'
	export let media: CardsFile[] | null
	const local_id = getId()
	const createObserver = (e: HTMLElement) => {
		loadObserver(`.gallery-child-${local_id}`, e, `gallery-${local_id}`)
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
		}) || null
</script>

<div
	data-gallery={media.length > 1 ? 'true' : undefined}
	id="gallery-{local_id}"
	class="gallery-card flex snap-x snap-mandatory gap-4 overflow-y-hidden overflow-x-scroll"
>
	{#each files as m, i}
		<!-- {@const custom_class = m.height > m.width ? 'w-full' : 'h-full'} -->
		<div
			data-observe={i + 1}
			class="gallery-child gallery-child-{local_id} relative flex w-full flex-shrink-0 snap-center items-center justify-center"
		>
			{#if m}
				<Picture image={m}></Picture>
			{/if}
		</div>
	{:else}
		<div class="h-64 bg-slate-300 w-full flex justify-center items-center font-mono">
			<p class="-rotate-45">insert image here</p>
		</div>
	{/each}
</div>
{#if media.length > 1}
	<div class="number-indicator absolute bottom-2 right-2 flex gap-1 rounded-full px-4">
		<p class="" use:createObserver></p>
		<p>of {media.length}</p>
	</div>
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
</style>
