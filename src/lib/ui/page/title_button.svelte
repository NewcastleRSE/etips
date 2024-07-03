<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	export let slug: string
	export let title: string
	const dispatch = createEventDispatcher()
	const right_chevron = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-chevron-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M11 9l3 3l-3 3" />
  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
</svg>`
	const down_chevron = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-chevron-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 11l-3 3l-3 -3" />
  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
</svg>`
</script>

<div
	class="page-title flex h-12 items-center justify-center md:h-16"
	class:selected={!$page.params.topic}
>
	<button
		class="flex w-full justify-between px-8 lg:justify-center lg:px-0 lg:text-center"
		on:click={() => {
			dispatch('click', slug)
		}}
	>
		<h2
			class="page-title-text overflow-hidden text-ellipsis text-nowrap text-xl capitalize md:hidden"
		>
			{title}{$page.params.topic ? ` - ${$page.data.topic.title}` : ''}
		</h2>
		<h2
			class="page-title-text hidden overflow-hidden text-ellipsis text-nowrap text-xl capitalize md:block"
		>
			{title}
		</h2>

		<div class="icon-wrapper lg:hidden">
			<DynamicIcon
				stroke={2.5}
				size={32}
				selected={!$page.params.topic}
				icon={!$page.params.topic ? down_chevron : right_chevron}
			></DynamicIcon>
		</div>
	</button>
</div>

<style>
	.page-title {
		background-color: var(--theme-colour-1);
		border-bottom: 1px solid var(--theme-colour-4);
		font-family: var(--theme-font-title);
		color: var(--theme-colour-5);
		transition: all 0.3s ease-in-out;
	}
	.selected {
		background-color: var(--theme-colour-5);
		color: var(--theme-colour-1);
	}
	/* NOTE: to avoid selected marks in desktop */
	@media (min-width: 1024px) {
		.selected {
			color: var(--theme-colour-5);
			background-color: var(--theme-colour-1);
		}
	}
</style>
