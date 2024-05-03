<script lang="ts">
	export let id: string = crypto.randomUUID()
	export let selected = false
	export let label = ''
	export let height = '100%'
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button'
	export let disabled = false
</script>

<button
	{id}
	{type}
	{disabled}
	on:click
	class:selected
	class="w-full flex-shrink-0 snap-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-6 text-sm md:px-12 md:text-base"
	style="height: {height};"
>
	{label}
</button>

<style>
	button {
		color: var(--theme-colour-4);
		border: 1px solid var(--theme-colour-4);
		transition: all 0.3s ease-in-out;
	}
	button:hover:not(:disabled):not(:active) {
		color: var(--theme-colour-1);
		background-color: color-mix(in oklab, var(--theme-colour-5) 50%, white 70%);
	}
	button:active {
		background-color: color-mix(in oklab, var(--theme-colour-5) 70%, white 30%);
		scale: 0.97;
	}
	.selected {
		color: var(--theme-colour-1);
		background-color: var(--theme-colour-5);
	}
</style>
