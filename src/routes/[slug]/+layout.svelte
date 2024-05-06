<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import type { Page } from '$lib/types/index.js'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import NavPages from '$lib/ui/nav/nav_pages.svelte'
	import NavTopics from '$lib/ui/nav/nav_topics.svelte'
	import Title from '$lib/ui/page/title.svelte'
	export let data
	const pages = data.pages as Page[]
	let windowWidth = 0
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth < 1024}
	<div class="slug-layout-mobile lg:hidden">
		<NavPages
			on:click={(e) => {
				goto(`/${e.detail}`)
			}}
			{pages}
		></NavPages>
		<Title
			on:click={() => {
				if ($page.params.topic) {
					goto(`/${data.page.slug}`)
				} else {
					const first_topic = data.page.topics ? data.page.topics[0] : null
					if (first_topic) {
						goto(`/${data.page.slug}/${first_topic.slug}`)
					}
				}
			}}
			slug={data.page.slug}
			title={data.page.title}
		></Title>
		{#if $page.params.topic}
			<NavTopics
				on:click={(e) => {
					goto(`/${data.page.slug}/${e.detail}`)
				}}
				topics={data.topics}
			></NavTopics>
		{/if}
		<slot />
	</div>
{/if}
<div
	class="slug-layout-desktop hidden h-full overflow-hidden pb-12 lg:grid lg:grid-cols-[minmax(0,4fr),minmax(0,9fr)]"
>
	<div
		class="slug-layout-left-col col-span-1 col-start-1 row-span-1 row-start-1 h-full overflow-y-scroll pb-12"
	>
		<NavPages
			on:click={(e) => {
				goto(`/${e.detail}`)
			}}
			{pages}
		></NavPages>
		<Title
			on:click={() => {
				goto(`/${data.page.slug}`)
			}}
			slug={data.page.slug}
			title={data.page.title}
		></Title>

		{#if data.page.cards}
			<CardsContainer desktop_left display="cards" cards={data.page.cards}></CardsContainer>
		{/if}
		<!-- <div class="invisible h-12 w-full"></div> -->
	</div>
	<div
		class="slug-layout-right-col col-span-1 col-start-2 row-span-1 row-start-1 h-full w-full overflow-y-scroll pb-12"
	>
		{#if $page.params.topic}
			<NavTopics
				on:click={(e) => {
					goto(`/${data.page.slug}/${e.detail}`)
				}}
				topics={data.topics}
			></NavTopics>
		{/if}
		<slot />
		<!-- <div class="invisible h-12 w-full"></div> -->
	</div>
</div>

<style>
	.slug-layout-left-col {
		border-right: 3px solid var(--theme-colour-6);
		background-color: color-mix(in oklab, var(--theme-colour-4) 20%, white 90%);
	}
</style>
