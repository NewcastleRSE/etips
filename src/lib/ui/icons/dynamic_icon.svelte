<script lang="ts">
	const colour_regex = /stroke="#(?:[A-Fa-f0-9]{3}){1,2}\b"/i
	const height_regex = /height="[0-9]+"/i
	const width_regex = /width="[0-9]+"/i
	const stroke_regex = /stroke-width="[0-9]*\.[0-9]+"/i
	export let size = 24
	export let colour = '#000000'
	export let stroke = 1
	export let icon: string
	export let selected = false
	const example = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#44B3CE" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M10 12h4v4h-4z" />
</svg>`
</script>

{#if icon}
	<div class="svg" class:selected>
		{@html icon
			.replace(colour_regex, `stroke="${colour}"`)
			.replace(height_regex, `height="${size}"`)
			.replace(width_regex, `width="${size}"`)
			.replace(stroke_regex, `stroke-width="${stroke}"`)}
	</div>
{/if}

<style>
	.svg.selected {
		background-color: var(--theme-colour-6);
	}
	:global(.svg > svg) {
		stroke: var(--theme-colour-4);
	}
	:global(.svg.selected > svg) {
		stroke: var(--theme-colour-1);
	}
</style>
