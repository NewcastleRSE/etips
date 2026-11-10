<script lang="ts">
	import type { Card, Language, MiniGuide } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import { page } from '$app/stores'
	export let card: Card

	type Guide = { id: string; language: Language; file: DirectusFile }

	// Only guides with a language and a PDF can be offered
	$: guides = (($page.data.mini_guides ?? []) as MiniGuide[]).filter(
		(g): g is MiniGuide & Guide =>
			!!g.language && typeof g.language !== 'string' && !!g.file && typeof g.file !== 'string'
	)
	// Default to English when there is one, otherwise the first language
	let selected_id = ''
	$: if (!guides.some((g) => g.id === selected_id)) {
		selected_id = (guides.find((g) => g.language.code === 'en') ?? guides[0])?.id ?? ''
	}
	$: selected = guides.find((g) => g.id === selected_id)

	const label = (l: Language) =>
		l.native_name && l.native_name !== l.name ? `${l.native_name} (${l.name})` : (l.name ?? l.code)
	const size = (bytes?: number | string | null) =>
		bytes ? `${(Number(bytes) / 1024 / 1024).toFixed(1)} MB` : ''
</script>

{#if guides.length > 0}
	<section class="mini-guide flex flex-col gap-4 p-4 lg:p-8" id={card.id}>
		<h3 class="text-xl md:text-2xl">{card.title ?? 'Mini guide'}</h3>
		{#if card.copy}
			<div class="copy prose-sm lg:prose-base">{@html card.copy}</div>
		{/if}
		<div class="flex flex-col gap-2">
			<label for="mini-guide-language-{card.id}" class="text-base md:text-lg">
				Choose a language
			</label>
			<select
				id="mini-guide-language-{card.id}"
				class="language-select rounded-lg"
				bind:value={selected_id}
			>
				{#each guides as guide (guide.id)}
					<option value={guide.id} lang={guide.language.code}>{label(guide.language)}</option>
				{/each}
			</select>
		</div>
		{#if selected}
			<a
				href="/assets/{selected.file.id}?download"
				download
				hreflang={selected.language.code}
				class="download-link flex items-center gap-2 self-start rounded-full px-6 py-2 text-base md:text-lg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
					<path d="M7 11l5 5l5 -5" />
					<path d="M12 4l0 12" />
				</svg>
				<span>
					Download {selected.language.name ?? ''} mini guide
					<span class="text-sm">(PDF{size(selected.file.filesize) ? `, ${size(selected.file.filesize)}` : ''})</span>
				</span>
			</a>
		{/if}
	</section>
{/if}

<style>
	.mini-guide {
		color: var(--theme-colour-3);
	}
	h3 {
		font-family: var(--theme-font-title);
	}
	.language-select {
		color: var(--theme-colour-3);
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-text-blue);
		max-width: 24rem;
	}
	.download-link {
		font-family: var(--theme-font-title-2);
		color: var(--theme-colour-1);
		background-color: var(--theme-text-green);
		transition: background-color 0.3s ease-in-out;
	}
	.download-link:hover {
		background-color: var(--theme-colour-3);
	}
	.download-link:focus-visible,
	.language-select:focus-visible {
		outline: 2px solid var(--theme-text-blue);
		outline-offset: 2px;
	}
</style>
