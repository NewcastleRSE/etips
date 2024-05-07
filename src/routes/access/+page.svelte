<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { notify } from '$lib/stores/notify'
	import Button from '$lib/ui/button/button.svelte'
	import SelectionInput from '$lib/ui/form/selection_input.svelte'
	import TextInput from '$lib/ui/form/text_input.svelte'
	let criteria_met = false
	let contact_consent = false
	let disclaimer_consent = false
	let role = ''
</script>

<!-- TODO: fix scroll size on desktop -->
<div
	class="accept-page h-full w-full overflow-y-scroll pb-96"
	class:doctor={role === 'doctor'}
	class:parent={role === 'parent'}
>
	<form
		class="h-full w-full pb-64 lg:w-3/4"
		action="?/register"
		method="POST"
		use:enhance={() => {
			notify.send({ value: `Accessing...` })
			return async ({ result }) => {
				if (result.type === 'failure') {
					notify.send({ value: `${result.data?.message}` })
				}
				if (result.type === 'success') {
					notify.send({ value: `Welcome to eTIPS` })
					goto(`${result.data?.url}`)
				}
			}
		}}
	>
		<div class="role-selection mb-8 grid h-40 w-full grid-cols-2 gap-4">
			<button
				class="role-selection-left-col flex h-full w-full flex-col items-center justify-evenly rounded-lg opacity-60 transition-all hover:opacity-100"
				class:opacity-100={role === 'parent'}
				on:click={() => {
					role = 'parent'
				}}
				type="button"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-user"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#ffffff"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
					<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
				</svg>
				<p>Parent / Carer</p></button
			>
			<button
				class="role-selection-right-col flex h-full w-full flex-col items-center justify-evenly rounded-lg opacity-60 transition-all hover:opacity-100"
				class:opacity-100={role === 'doctor'}
				on:click={() => {
					role = 'doctor'
				}}
				type="button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-stethoscope"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#ffffff"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
					<path d="M8 15a6 6 0 1 0 12 0v-3" />
					<path d="M11 3v2" />
					<path d="M6 3v2" />
					<path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
				</svg>
				<p>Healthcare professional</p>
			</button>
		</div>
		<SelectionInput
			bind:checked={criteria_met}
			required
			label="Confirm inclusion/exclusion criteria met"
			name="criteria-met"
		></SelectionInput>
		{#if role !== 'doctor'}
			<TextInput
				required
				label="Age of child (in weeks)"
				type="number"
				name="age-weeks"
				id="form-age-weeks"
			></TextInput>
			<TextInput
				required
				label="Preterm (in weeks)"
				type="number"
				name="age-preterm"
				id="form-age-preterm"
			></TextInput>

			<SelectionInput
				left_label="Left"
				right_label="Right"
				required
				label="Side of brain affected"
				name="side-affected"
				information_label="More information"
				information
				option
			></SelectionInput>
		{/if}
		<SelectionInput
			bind:checked={contact_consent}
			label="Consent to be contacted in future research?"
			name="gdpr-consent"
			information_label="GDPR Notice"
			information
		></SelectionInput>
		{#if contact_consent}
			<TextInput required label="First name" type="text" name="first-name" id="form-first-name"
			></TextInput>
			<TextInput required label="Last name" type="text" name="last-name" id="form-last-name"
			></TextInput>
			<TextInput required label="Email" type="email" name="email" id="form-email"></TextInput>
		{/if}
		<SelectionInput
			bind:checked={disclaimer_consent}
			required
			label="I have read and accept the disclaimer"
			name="disclaimer-consent"
		></SelectionInput>
		<!-- {#if disclaimer_consent && criteria_met} -->
		<Button
			type="submit"
			label="Access"
			height="3rem"
			disabled={!disclaimer_consent || !criteria_met || role === 'doctor'}
			disabled_notice="You need to accept the disclaimer and criteria before accessing the materials"
		></Button>
		<!-- <Button type="submit" label="Access" height="3rem"></Button> -->
		<!-- {/if} -->
	</form>
</div>

<style>
	form {
		padding: 1rem 1.5rem;
		min-height: 100lvh;
		margin-inline: auto;
	}
	.accept-page {
		margin-inline: auto;
		background-color: var(--theme-colour-1);
		border-width: 0 1px;
		border-style: solid;
		border-color: var(--theme-colour-4);
		transition: all 0.3s ease-in-out;
	}
	.role-selection {
		font-family: var(--theme-font-subtitle);
		font-size: 1.2rem;
	}
	.role-selection-left-col {
		color: var(--theme-colour-1);
		background: var(--theme-colour-4);
	}
	.role-selection-right-col {
		color: var(--theme-colour-1);
		background: var(--theme-colour-5);
	}
	.parent {
		background: color-mix(in srgb, var(--theme-colour-4) 10%, white 80%);
	}
	.doctor {
		background: color-mix(in srgb, var(--theme-colour-5) 10%, white 80%);
	}
</style>
