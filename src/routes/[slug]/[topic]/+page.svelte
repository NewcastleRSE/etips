<script lang="ts">
	import SvelteSeo from 'svelte-seo'
	import { page } from '$app/stores'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import { genDescription, genTitle } from '$lib/utils/seo.js'
	export let data
	$: page_title = genTitle([$page.params.slug])
	$: page_description = genDescription(data.topic.cards)
	$: page_url = `https://etips.org.uk/${$page.params.slug}`
</script>

<svelte:head>
	{#key $page}
		<title>{genTitle([$page.params.slug, $page.params.topic])}</title>
	{/key}
</svelte:head>
<SvelteSeo
	title={page_title}
	description={page_description}
	canonical={page_url}
	openGraph={{
		title: page_title,
		description: page_description,
		url: page_url,
		type: 'website',
		images: [
			{
				url: 'https://etips.org.uk/favicon.png',
				width: 800,
				height: 600,
				alt: 'e-tips logo'
			}
		],
		site_name: page_title
	}}
></SvelteSeo>
<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen overflow-x-hidden lg:w-full">
	{#if data.topic.cards}
		<CardsContainer display={data.topic.display ?? 'cards'} cards={data.topic.cards}
		></CardsContainer>
	{/if}
</div>

<style>
	.content-container {
		width: min(100% - 4rem, 800px);
		margin-inline: auto;
	}
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
