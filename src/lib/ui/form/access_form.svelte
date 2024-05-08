<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { notify } from '$lib/stores/notify'
	import Button from '$lib/ui/button/button.svelte'
	import SelectionInput from '$lib/ui/form/selection_input.svelte'
	import TextInput from '$lib/ui/form/text_input.svelte'
	import { scrollIntoView } from '$lib/utils/scroll'
	import CardMedia from '../cards/card_media.svelte'
	import CardText from '../cards/card_text.svelte'
	import FormDisclaimer from './form_disclaimer.svelte'
	import RoleSelection from './role_selection.svelte'
	export let data
	//TODO: dynamically select these blocks!
	const gdpr_notice = data.page.cards.filter(
		(c) => c.cards_id.id === '44aebd0d-9cfc-4a6d-9905-31c440b5e194'
	)[0].cards_id
	const youtube_video = data.page.cards.filter(
		(c) => c.cards_id.id === 'dbf6c9d3-0293-4ff0-97b3-e6f52cb94692'
	)[0].cards_id

	let criteria_met = false
	let contact_consent = false
	let disclaimer_consent = false
	let specific_case = false
	let role = ''
</script>

<form
	class=" {role}"
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
	<FormDisclaimer {data}></FormDisclaimer>
	<SelectionInput
		bind:checked={criteria_met}
		required
		label="Confirm inclusion/exclusion criteria met"
		name="criteria-met"
	></SelectionInput>
	<SelectionInput
		bind:checked={disclaimer_consent}
		required
		label="I have read and accept the disclaimer"
		name="disclaimer-consent"
	></SelectionInput>
	{#if disclaimer_consent && criteria_met}
		<RoleSelection bind:role></RoleSelection>
		{#if role !== ''}
			{#if role !== 'doctor' || (role === 'doctor' && specific_case)}
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
				>
					<CardMedia card={youtube_video}></CardMedia>
				</SelectionInput>
			{/if}
			<SelectionInput
				bind:checked={contact_consent}
				label="Consent to be contacted in future research?"
				name="gdpr-consent"
				information_label="GDPR Notice"
				information
			>
				<CardText card={gdpr_notice}></CardText>
			</SelectionInput>
			{#if contact_consent}
				<TextInput required label="First name" type="text" name="first-name" id="form-first-name"
				></TextInput>
				<TextInput required label="Last name" type="text" name="last-name" id="form-last-name"
				></TextInput>
				<TextInput required label="Email" type="email" name="email" id="form-email"></TextInput>
			{/if}
			<Button
				type="submit"
				label="Access"
				height="3rem"
				disabled={!disclaimer_consent || !criteria_met || role === 'doctor'}
				disabled_notice="You need to accept the disclaimer and criteria before accessing the materials"
			></Button>
			<div class="its-me h-2 w-2" use:scrollIntoView></div>
		{/if}
	{/if}
</form>

<style>
	form {
		padding: 1rem 1.5rem;
		margin-inline: auto;
		width: min(100% - 2rem, 800px);
		border-left: 1px solid var(--theme-colour-4);
		border-right: 1px solid var(--theme-colour-4);
		background-color: var(--theme-colour-1);
	}
	.parent {
		background: color-mix(in srgb, var(--theme-colour-4) 10%, white 80%);
	}
	.doctor {
		background: color-mix(in srgb, var(--theme-colour-5) 10%, white 80%);
	}
</style>