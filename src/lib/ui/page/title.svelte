<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'
	export let slug: string
	export let title: string
	const dispatch = createEventDispatcher()
</script>

<div
	class="page-title flex h-12 items-center justify-center md:h-16"
	class:selected={!$page.params.topic}
>
	<button
		on:click={() => {
			dispatch('click', slug)
		}}
	>
		<h2 class="page-title-text text-xl capitalize">{title}</h2>
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
</style>
