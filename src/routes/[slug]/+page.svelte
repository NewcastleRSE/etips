<script lang="ts">
	import SvelteSeo from 'svelte-seo'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import { genDescription, genTitle } from '$lib/utils/seo.js'
	import { fly } from 'svelte/transition'
	export let data
	$: page_title = genTitle([$page.params.slug])
	$: page_description = genDescription(data.page.cards)
	$: page_url = `https://etips.org.uk/${$page.params.slug}`
	let page_keywords = `perinatal stroke, therapy, baby therapy, baby support, medical research, research, Newcastle, Newcastle University, medical advice, health, medicine`
</script>

<svelte:head>
	{#key $page}
		<title>{page_title}</title>
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
	keywords={page_keywords}
></SvelteSeo>
<div class="content-container w-screen overflow-x-hidden lg:w-full">
	{#if data.page.cards}
		<div class="content-mobile lg:hidden">
			<CardsContainer cards={data.page.cards}></CardsContainer>
			{#if data.page.topics && data.page.cards.length === 0}
				{#each data.page.topics as topic}
					<div class="m-4 h-12">
						<Button
							label={topic.title}
							on:click={() => {
								goto(`/${$page.params.slug}/${topic.slug}`)
							}}
						></Button>
					</div>
				{/each}
			{/if}
		</div>
		<div
			class="content flex h-full flex-wrap bg-white/40 p-2 lg:grid lg:grid-cols-3 lg:bg-white/0 xl:grid-cols-4 xl:p-4 2xl:grid-cols-5"
		>
			{#if data.page.topics}
				{#key data.page}
					{#each data.page.topics as topic, i}
						<div
							class="available-topics-button-wrapper w-full p-8 md:w-1/2 lg:aspect-square lg:w-full xl:p-6"
							in:fly={{ duration: 300, x: -200, delay: 100 * i }}
						>
							<button
								class="available-topics-button flex h-full w-full items-center justify-evenly rounded-lg p-4 text-lg lg:flex-col xl:p-2 xl:text-2xl"
								on:click={() => {
									goto(`/${$page.params.slug}/${topic.slug}`)
								}}
							>
								{#if topic.icon}
									<div class="icon flex w-full justify-center gap-2">
										{@html topic.icon}
									</div>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="icon icon-tabler icon-tabler-mood-kid hidden md:block"
										width="88"
										height="88"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="#44b3ce"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
										<path d="M9 10l.01 0" />
										<path d="M15 10l.01 0" />
										<path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
										<path d="M12 3a2 2 0 0 0 0 4" />
									</svg>
								{/if}
								<p>{topic.title}</p>
							</button>
						</div>
					{/each}
				{/key}
			{/if}
		</div>
	{/if}
</div>

<style>
	.content-container {
		background-color: color-mix(in oklab, var(--theme-colour-5) 40%, var(--theme-colour-1) 10%);
	}
	.content-mobile {
		margin-inline: auto;
	}
	.available-topics-button {
		font-family: var(--theme-font-title);
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-4);
		color: var(--theme-colour-4);
		transition: all 0.3s ease-in-out;
	}
	.available-topics-button:hover {
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-3);
		color: var(--theme-colour-3);
		box-shadow: -5px -5px 50px color-mix(in oklab, var(--theme-colour-4) 50%, var(--theme-colour-1)
					95%);
	}
	svg {
		transition: all 0.3s ease-in-out;
	}
	.available-topics-button:hover > svg {
		stroke: var(--theme-colour-3);
	}
	@media (min-width: 1024px) {
		.content-container {
			background: inherit;
		}
	}
</style>
