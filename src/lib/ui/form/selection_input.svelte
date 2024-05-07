<script>
	import { onMount } from 'svelte'
	import Button from '../button/button.svelte'
	export let left_label = 'Yes'
	export let right_label = 'No'
	export let name
	export let label = 'My question?'
	export let required = false
	export let information = false
	export let information_label = ''
	export let open_information = false
	export let option = false
	export let checked = false
	let checked_position = 0
	let checked_opacity = 1
	let checked_dynamic = false
	let hovering = false
	onMount(() => {
		checked ? (checked_position = 0) : (checked_position = 50)
	})
</script>

<div class="selection-input-container mb-4 flex flex-col gap-2">
	<div class="label-container grid gap-2 text-sm md:text-base" class:grid-cols-2={information}>
		<p data-required={required ? 'yes' : 'no'} class="label w-full">
			{label}
		</p>
		<div class="right-col">
			{#if information}
				<Button
					height="100%"
					on:click={() => {
						open_information = !open_information
					}}
					label={information_label}
				></Button>
			{/if}
		</div>
	</div>
	<input {name} class="hidden" type="checkbox" {checked} />
	{#if open_information}
		<div class="information-container aspect-square w-full overflow-x-hidden overflow-y-scroll p-4">
			<div class="content h-full w-full bg-black"></div>
		</div>
	{/if}
	<div
		data-checked={checked ? 'yes' : 'no'}
		data-option={option ? 'yes' : 'no'}
		data-hovering={hovering ? 'yes' : 'no'}
		class="checkbox-button-container flex w-full"
		style:--checked-position={checked_position + '%'}
		style:--checked_opacity={checked_opacity}
		on:pointermove={(e) => {
			if (checked_dynamic) {
				const current_position = (e.layerX * 100) / e.currentTarget.clientWidth
				checked_position = current_position > 50 ? 50 : 0
			}
		}}
		on:pointerenter={() => {
			checked_dynamic = true
			checked_opacity = 0.5
			hovering = true
		}}
		on:pointerleave={() => {
			checked_dynamic = false
			if (checked) {
				checked_position = 0
			} else {
				checked_position = 50
			}
			checked_opacity = 1
			hovering = false
		}}
	>
		<button
			type="button"
			data-checked={checked ? 'yes' : 'no'}
			class="button-left z-10 w-1/2 flex-shrink-0 rounded-l-full"
			on:click={() => {
				checked_dynamic = false
				checked_position = 0
				checked_opacity = 1
				checked = true
				hovering = false
			}}>{left_label}</button
		>
		<button
			type="button"
			data-checked={checked ? 'no' : 'yes'}
			class="button-right z-10 w-1/2 flex-shrink-0 rounded-r-full"
			on:click={() => {
				checked_dynamic = false
				checked_position = 50
				checked_opacity = 1
				checked = false
				hovering = false
			}}>{right_label}</button
		>
	</div>
</div>

<style>
	.label {
		font-family: var(--theme-font-title-2);
		color: var(--theme-colour-3);
	}
	.label[data-required='yes']::after {
		content: ' *';
		font-size: 0.8rem;
	}
	.label[data-required='yes']:hover::after {
		content: ' * (required)';
		font-size: 0.8rem;
	}

	button {
		padding: 0.5rem 0;
		color: var(--theme-colour-3);
		transition: all 0.3s ease-in-out;
	}
	/* button:hover { */
	/* 	background-color: var(--theme-colour-5); */
	/* 	color: var(--theme-colour-1); */
	/* } */
	button[data-checked='yes'] {
		color: var(--theme-colour-1);
	}
	.checkbox-button-container {
		background-color: var(--theme-colour-1);
		position: relative;
		overflow: hidden;
		border-radius: 1000px;
	}
	.checkbox-button-container::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 50%;
		left: var(--checked-position);
		top: 0px;
		background-color: var(--theme-colour-5);
		opacity: var(--checked_opacity);
		pointer-events: none;
		transition: all 0.3s ease-in-out;
	}
	.checkbox-button-container[data-checked='yes'][data-option='no'][data-hovering='no']::before {
		background-color: var(--theme-colour-5);
	}
	.checkbox-button-container[data-checked='no'][data-option='no'][data-hovering='no']::before {
		background-color: var(--theme-colour-7);
	}
	.checkbox-button-container[data-hovering='yes']:hover::before {
		background-color: var(--theme-colour-4);
	}
	.checkbox-button-container[data-hovering='yes'] > button {
		color: var(--theme-colour-3);
	}
	.button-left {
		border: 1px solid var(--theme-colour-4);
	}
	.button-right {
		border-style: solid;
		border-color: var(--theme-colour-4);
		border-width: 1px 1px 1px 0;
	}
</style>
