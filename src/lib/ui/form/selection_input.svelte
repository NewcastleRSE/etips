<script lang="ts">
	import { onMount } from 'svelte'
	import Button from '../button/button.svelte'
	import { getId } from '@arturoguzman/art-ui'
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
	let local_id = getId()
	let checked_position = 0
	let checked_opacity = 1
	let checked_dynamic = false
	let hovering = false
	let hover_message: undefined | string = undefined
	onMount(() => {
		checked ? (checked_position = 0) : (checked_position = 50)
	})
	let cursor_x = 0
	let cursor_y = 0
	let timeout: number = 0
</script>

<div class="selection-input-container mb-4 flex flex-col gap-2">
	<div class="label-container grid gap-2 text-sm md:text-base" class:grid-cols-2={information}>
		<p data-required={required ? 'yes' : 'no'} class="label w-full">
			{label}
		</p>
		<div class="right-col">
			{#if information}
				<Button
					selected={open_information}
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
		<slot></slot>
	{/if}
	<div
		data-checked={checked ? 'yes' : 'no'}
		data-option={option ? 'yes' : 'no'}
		data-hovering={hovering ? 'yes' : 'no'}
		data-hover-message={hover_message}
		class="checkbox-button-container flex w-full"
		style:--checked-position={checked_position + '%'}
		style:--checked_opacity={checked_opacity}
		style:--cursor-x="{cursor_x}px"
		style:--cursor-y="{cursor_y}px"
		on:pointermove={(e) => {
			cursor_x = e.clientX
			cursor_y = e.clientY - 50
			if (checked_dynamic) {
				if (e.target.id === `left-${local_id}`) {
					checked_position = 0
				} else {
					checked_position = 50
				}
			}
		}}
		on:pointerenter={() => {
			timeout = setTimeout(() => {
				hover_message = 'Click to continue'
			}, 3000)
			checked_dynamic = true
			checked_opacity = 0.5
			hovering = true
		}}
		on:pointerleave={() => {
			clearTimeout(timeout)
			hover_message = undefined
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
			id="left-{local_id}"
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
			id="right-{local_id}"
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
	.checkbox-button-container[data-hover-message]:hover::after {
		content: attr(data-hover-message);
		position: fixed;
		top: var(--cursor-y);
		left: var(--cursor-x);
		color: var(--theme-colour-5);
		background-color: var(--theme-colour-1);
		padding: 0 1rem;
		border: 1px solid var(--theme-colour-5);
		border-radius: 1000px;
		transform: translate(-50%, 0);
		z-index: 100;
		pointer-events: none;
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
