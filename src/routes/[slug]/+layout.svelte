<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import type { Page } from '$lib/types/index.js'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import NavPages from '$lib/ui/nav/nav_pages.svelte'
	import NavTopics from '$lib/ui/nav/nav_topics.svelte'
	import Title from '$lib/ui/page/title_button.svelte'
	export let data
	const pages = data.pages as Page[]
	let windowWidth = 0
	let grid_open = true
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
{:else}
	<div
		class="slug-layout-desktop hidden h-full overflow-hidden transition-all lg:grid {grid_open
			? 'grid-cols-[minmax(0,4fr),minmax(0,9fr)]'
			: 'grid-cols-[minmax(0,1fr),minmax(0,18fr)]'}"
	>
		<div
			data-open={grid_open ? 'true' : undefined}
			class="slug-layout-left-col col-span-1 col-start-1 row-span-1 row-start-1 h-full"
		>
			<NavPages
				on:click={(e) => {
					goto(`/${e.detail}`)
				}}
				direction={grid_open ? 'horizontal' : 'vertical'}
				{pages}
			></NavPages>
			{#if grid_open}
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
			{/if}
			<!-- <div class="invisible h-12 w-full"></div> -->
		</div>
		<div
			class="slug-layout-right-col relative col-span-1 col-start-2 row-span-1 row-start-1 h-full w-full overflow-y-scroll"
		>
			<button
				class="toggle-col-button fixed z-10 w-12"
				data-hover-message={grid_open ? 'Close' : 'Open'}
				on:click={() => {
					grid_open = !grid_open
				}}
				>{#if grid_open}<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-square-arrow-left"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#179100"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 8l-4 4l4 4" />
						<path d="M16 12h-8" />
						<path
							d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-square-arrow-right"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#179100"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 16l4 -4l-4 -4" />
						<path d="M8 12h8" />
						<path
							d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
						/>
					</svg>{/if}</button
			>
			<slot />
		</div>
	</div>
{/if}

<style>
	.slug-layout-left-col[data-open] {
		border-right: 3px solid var(--theme-colour-6);
		background-color: color-mix(in oklab, var(--theme-colour-4) 20%, white 90%);
		overflow-y: scroll;
	}
	/* .slug-layout-left-col[data-open]:hover { */
	/* 	overflow-y: initial; */
	/* 	background: red; */
	/* } */
	.toggle-col-button[data-hover-message]:hover::after {
		content: attr(data-hover-message);
		position: absolute;
		top: 20%;
		right: 0px;
		transform: translate(100%, 0%);
		color: var(--theme-colour-5);
		background-color: var(--theme-colour-1);
		padding: 0 1rem;
		border-radius: 999px;
		border: 1px solid var(--theme-colour-5);
	}
	@media (min-width: 1024px) {
		.slug-layout-left-col:hover {
			scrollbar-width: thin;
		}
	}
</style>
