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
</script>

<div class="accept-page">
	<form
		class="w-full lg:w-1/2"
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
		<SelectionInput
			bind:checked={criteria_met}
			required
			label="Confirm inclusion/exclusion criteria met"
			name="criteria-met"
		></SelectionInput>
		<TextInput
			required
			label="Age of child (in weeks)"
			type="number"
			name="age-weeks"
			id="form-age-weeks"
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
			disabled={!disclaimer_consent || !criteria_met}
			disabled_notice="You need to accept the disclaimer and criteria before accessing the materials"
		></Button>
		<!-- <Button type="submit" label="Access" height="3rem"></Button> -->
		<!-- {/if} -->
	</form>
</div>

<style>
	form {
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100lvh;
	}
	.accept-page {
		display: flex;
		justify-content: center;
		width: min(100% - 2rem, 1000px);
		margin-inline: auto;
		background-color: var(--theme-colour-1);
		border-width: 0 1px;
		border-style: solid;
		border-color: var(--theme-colour-4);
	}
</style>
