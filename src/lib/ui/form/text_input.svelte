<script lang="ts">
	export let name
	export let id = ''
	export let type: 'text' | 'email' | 'number'
	export let label = ''
	export let required = false
	export let min = 0
	export let max = 52
</script>

<div class="text-input mb-2 flex flex-col gap-2">
	<label class="label text-sm md:text-base" data-required={required ? 'yes' : 'no'} for={id}
		>{label}</label
	>
	<input
		required
		{min}
		{max}
		{name}
		{id}
		{type}
		on:keypress={(evt) => {
			if (type === 'number') {
				if (evt.keyCode < 48 || evt.keyCode > 57) {
					evt.preventDefault()
				}
			}
		}}
	/>
</div>

<style>
	.label {
		font-family: var(--theme-font-title-2);
		color: var(--theme-colour-3);
	}
	input {
		border-radius: 0.5rem;
		border-color: var(--theme-colour-4);
	}
	label[data-required='yes']::after {
		content: ' *';
		font-size: 0.8rem;
	}
	label[data-required='yes']:hover::after {
		content: ' * (required)';
	}
</style>
