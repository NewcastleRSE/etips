<script lang="ts">
	import type { Topic } from '$lib/types'
	import { createEventDispatcher } from 'svelte'
	import Button from '../button/button.svelte'
	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	export let topics: Topic[]
	function setButtons(topics: Topic[], slug: string) {
		const filtered = topics.filter((t) => t.slug === slug)
		const currentIndex = topics.indexOf(filtered[0])
		const length = topics.length
		if (currentIndex <= -1) {
			return {
				previous: topics[0].slug,
				next: topics[length - 1].slug
			}
		}
		const previous = currentIndex === 0 ? topics[length - 1].slug : topics[currentIndex - 1].slug
		const next = currentIndex === length - 1 ? topics[0].slug : topics[currentIndex + 1].slug
		return {
			previous,
			next
		}
	}
	$: buttons = setButtons(topics, $page.params.topic)
	const dispatch = createEventDispatcher()
	$: if ($page.params.topic && browser) {
		setTimeout(() => {
			const active_button = document.getElementById(`button-${$page.params.topic}`)
			if (active_button) {
				active_button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
			}
		}, 200)
	}
</script>

<nav
	class="topics-nav sticky left-0 top-12 z-50 grid h-12 grid-cols-[minmax(0,3rem),minmax(0,1fr),minmax(0,3rem)] md:top-16 md:h-16 md:grid-cols-[minmax(0,4rem),minmax(0,1fr),minmax(0,4rem)] lg:top-0"
>
	<div class="topics-nav-left-col flex items-center justify-center">
		<button
			on:click={() => {
				dispatch('click', `${buttons.previous}`)
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-chevron-left"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#44B3CE"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M15 6l-6 6l6 6" />
			</svg>
		</button>
	</div>
	<div
		class="topics-nav-centre-col flex snap-x snap-mandatory items-center gap-4 overflow-y-hidden overflow-x-scroll px-4"
	>
		{#each topics as topic}
			<div class="topics-button-wrapper">
				<Button
					id="button-{topic.slug}"
					selected={$page.params.topic === topic.slug}
					on:click={() => {
						dispatch('click', topic.slug)
					}}
					label={topic.title}
					height="2rem"
				></Button>
			</div>
		{/each}
	</div>
	<div class="topics-nav-right-col flex items-center justify-center">
		<button
			on:click={() => {
				dispatch('click', `${buttons.next}`)
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-chevron-right"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#44B3CE"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M9 6l6 6l-6 6" />
			</svg>
		</button>
	</div>
</nav>

<style>
	nav {
		border-bottom: 1px solid var(--theme-colour-4);
		background-color: var(--theme-colour-1);
	}

	.topics-nav-button {
		background-color: var(--theme-colour-1);
		border-right: 1px solid var(--theme-colour-4);
	}
	.topics-nav-centre-col {
		border-left: 1px solid var(--theme-colour-4);
		border-right: 1px solid var(--theme-colour-4);
	}
	@media (min-width: 1024px) {
		.topics-nav-centre-col:hover {
			scrollbar-width: thin;
		}
	}
</style>
