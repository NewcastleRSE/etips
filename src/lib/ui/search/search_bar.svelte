<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import type { ActionResult } from '@sveltejs/kit'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	import { page } from '$app/stores'
	import { notify } from '$lib/stores/notify'
	let query = ''
	const search_icon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  <path d="M21 21l-6 -6" />
</svg>`
	const handleResult = async (res: ActionResult) => {
		if (res.type === 'success') {
			await applyAction(res)
		}
	}
	let search_bar_open = false
</script>

{#if $page.params.slug}
	{#if search_bar_open}
		<form
			class="flex h-full w-full"
			action="/search"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						notify.send({ value: `${result.data?.message}` })
						return
					}
					await handleResult(result)
					// await invalidateAll()
				}
			}}
		>
			<input
				class="search-input h-full w-full"
				required
				type="text"
				name="query"
				placeholder="Search for ..."
				bind:value={query}
			/>
			<button class="search-button">Search</button>
			<button
				class="search-button"
				type="button"
				on:click={() => {
					invalidateAll()
					query = ''
				}}>Clear</button
			>
		</form>
	{/if}
	<button
		on:click={() => {
			search_bar_open = !search_bar_open
		}}
		class="open-search-bar-button flex aspect-square h-full items-center justify-center transition-all"
		class:selected={search_bar_open}
	>
		<DynamicIcon selected={search_bar_open} icon={search_icon}></DynamicIcon>
	</button>
{/if}

<style>
	.search-button {
		color: var(--theme-colour-4);
		flex-shrink: 0;
		height: 100%;
		aspect-ratio: 1 / 1;
		border-right: 1px solid var(--theme-colour-4);
		text-align: center;
	}
	.search-button:last-child {
		border-right: none;
	}
	.search-input {
		border-top: none;
		border-bottom: 1px solid var(--theme-colour-4);
		border-right: 1px solid var(--theme-colour-4);
		border-left: 1px solid var(--theme-colour-4);
	}
	.open-search-bar-button {
		border-left: 1px solid var(--theme-colour-4);
	}
	.selected {
		background-color: var(--theme-colour-5);
	}
</style>
