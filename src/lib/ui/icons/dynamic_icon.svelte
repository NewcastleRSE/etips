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
	export let scale = 1
</script>

{#if icon}
	<div class="svg" class:selected style:--scale={scale}>
		{@html icon
			.replace(colour_regex, `stroke="${colour}"`)
			.replace(height_regex, `height="${size}"`)
			.replace(width_regex, `width="${size}"`)
			.replace(stroke_regex, `stroke-width="${stroke}"`)}
	</div>
{/if}

<style>
	.svg {
		scale: var(--scale);
		transition: all 0.3 ease-in-out;
	}
	.svg.selected {
		/* background-color: var(--theme-colour-6); */
	}
	:global(.svg > svg) {
		stroke: var(--theme-colour-4);
	}
	:global(.svg.selected > svg) {
		stroke: var(--theme-colour-1);
	}
</style>
