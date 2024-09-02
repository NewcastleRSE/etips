<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import SvelteSeo from 'svelte-seo'
	import { genTitle } from '$lib/utils/seo.js'
	export let data
	$: cards = data.page.cards.filter((c) => c.cards_id?.type === 'hero')
	let page_title = genTitle(['Welcome'])
	let page_url = 'https://etips.org.uk'
	let page_description = `eTIPS is an early therapy approach in perinatal stroke, supporting parents to encourage their baby's movements from an early age and within the first 6 months of life. The materials on this website were developed and used in a pilot feasibility study. The paper summarising this study is available open access at Feasibility trial of an early therapy in perinatal stroke (eTIPS) | BMC Neurology | Full Text (biomedcentral.com).`
</script>

<svelte:head>
	{#key $page}
		<title>{genTitle(['Welcome'])}</title>
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
<div class="content-container overflow-y-scroll">
	{#if data.page.cards}
		<CardsContainer {cards}></CardsContainer>
	{/if}
	<div class="button-wrapper mb-6 flex h-12 w-full items-center justify-center px-4 lg:w-96">
		<Button
			label="Access the materials"
			on:click={() => {
				goto('/access')
			}}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-arrow-right absolute right-8 top-1/2 -translate-y-1/2"
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
			</svg></Button
		>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.content-container {
			width: min(100%, 1000px);
			margin-inline: auto;
		}
	}
</style>
