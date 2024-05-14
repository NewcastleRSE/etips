<script lang="ts">
	import { page } from '$app/stores'
	import type { Page } from '$lib/types'
	import DynamicIcon from '../icons/dynamic_icon.svelte'
	import { goto } from '$app/navigation'
	export let page_button: Page
	export let direction: string
	let hover_message: string | undefined = undefined
	let timeout = 0
	let cursor_x = 0
	let cursor_y = 0
	let scale = 1
</script>

<button
	class="pages-nav-button flex w-full items-center justify-center"
	class:selected={$page.params.slug === page_button.slug}
	class:pages-nav-button-horizontal={direction === 'horizontal'}
	class:pages-nav-button-vertical={direction === 'vertical'}
	class:aspect-square={direction === 'vertical'}
	data-title={page_button.title}
	data-hover-message={hover_message}
	style:--scale={scale}
	style:--cursor-x="{cursor_x}px"
	style:--cursor-y="{cursor_y}px"
	on:pointerdown={() => {
		scale = 0.8
	}}
	on:pointerup={() => {
		scale = 1
	}}
	on:click={() => {
		goto(`/${page_button.slug}`)
	}}
	on:pointermove={(e) => {
		cursor_y = e.clientY
		cursor_x = e.clientX + 20
	}}
	on:pointerenter={() => {
		timeout = setTimeout(() => {
			hover_message = page_button.title
		}, 1000)
	}}
	on:pointerleave={() => {
		clearTimeout(timeout)
		hover_message = undefined
	}}
>
	<DynamicIcon
		{scale}
		selected={$page.params.slug === page_button.slug}
		icon={page_button.icon}
		stroke={1.5}
	></DynamicIcon>
</button>

<style>
	.pages-nav-button-horizontal {
		height: 100%;
		background-color: var(--theme-colour-1);
		border-right: 1px solid var(--theme-colour-4);
		position: relative;
		transition: all 0.3 ease-in-out;
	}
	.pages-nav-button-vertical {
		width: 100%;
		background-color: var(--theme-colour-1);
		border-bottom: 1px solid var(--theme-colour-4);
		position: relative;
		transition: all 0.3 ease-in-out;
	}
	.pages-nav-button[data-hover-message]::after {
		content: attr(data-hover-message);
		position: fixed;
		z-index: 999;
		top: var(--cursor-y);
		left: var(--cursor-x);
		transform: translate(0%, -25%);
		background: var(--theme-colour-1);
		color: var(--theme-colour-6);
		border-radius: 999px;
		border: 1px solid var(--theme-colour-6);
		padding: 0 1rem;
	}
	.pages-nav-button-horizontal:last-child {
		border-right: none;
	}
	.selected {
		background-color: var(--theme-colour-6);
		border: none;
	}
</style>
