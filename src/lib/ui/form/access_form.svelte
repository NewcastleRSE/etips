<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { goto, invalidateAll } from '$app/navigation'
	import { notify } from '$lib/stores/notify'
	import type { Card, Page, Topic } from '$lib/types'
	import Button from '$lib/ui/button/button.svelte'
	import SelectionInput from '$lib/ui/form/selection_input.svelte'
	import TextInput from '$lib/ui/form/text_input.svelte'
	import { scrollIntoView } from '$lib/utils/scroll'
	import { redirect } from '@sveltejs/kit'
	import CardText from '../cards/card_text.svelte'
	import DoctorFormFlow from './doctor_form_flow.svelte'
	import FormDisclaimer from './form_disclaimer.svelte'
	import ParentFormFlow from './parent_form_flow.svelte'
	import RoleSelection from './role_selection.svelte'
	export let data: {
		pages: Page[]
		topics: Topic[]
		page: Page
	}
	type FormCards = { gdpr_notice: Card | null; animation: Card | null; disclaimer: Card | null }
	const cards: FormCards = data.page?.cards?.reduce((acc, crd) => {
		if (crd && crd.cards_id && typeof crd.cards_id !== 'string') {
			if (crd.cards_id.id === 'a736fdb6-f22d-48ee-8f1f-5ac30b8450f2') {
				acc.disclaimer = crd.cards_id
			}
			if (crd.cards_id.id === '44aebd0d-9cfc-4a6d-9905-31c440b5e194') {
				acc.gdpr_notice = crd.cards_id
			}
			if (crd.cards_id.id === 'dbf6c9d3-0293-4ff0-97b3-e6f52cb94692') {
				acc.animation = crd.cards_id
			}
		}
		return acc
	}, {} as FormCards) || { gdpr_notice: null, animation: null, disclaimer: null }

	let contact_consent = false
	let disclaimer_consent = false
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
				if (result.data?.url) {
					notify.send({ value: `Welcome to eTIPS` })
					goto(`${result.data?.url}`)
					await applyAction(result)
					// await invalidateAll()
				}
			}
			if (result.type === 'redirect') {
				notify.send({ value: `Welcome to eTIPS` })
				await applyAction(result)
			}
		}
	}}
>
	{#if cards.disclaimer}
		<FormDisclaimer card={cards.disclaimer}></FormDisclaimer>
	{/if}
	<SelectionInput
		bind:checked={disclaimer_consent}
		required
		label="I have read and accept the disclaimer"
		name="disclaimer-consent"
	></SelectionInput>
	{#if disclaimer_consent}
		<RoleSelection bind:role></RoleSelection>
		<input type="text" name="role" bind:value={role} class="hidden opacity-0" />
		{#if role === 'healthcare-professional'}
			<DoctorFormFlow {cards}></DoctorFormFlow>
		{/if}
		{#if role === 'carer'}
			<ParentFormFlow {cards}></ParentFormFlow>
		{/if}

		{#if role !== ''}
			<SelectionInput
				bind:checked={contact_consent}
				label="Consent to be contacted in future research?"
				name="gdpr-consent"
				information_label="GDPR Notice"
				information
				option
			>
				{#if cards.gdpr_notice}
					<CardText card={cards.gdpr_notice}></CardText>
				{/if}
			</SelectionInput>
			{#if contact_consent}
				{#if role === 'healthcare-professional'}
					<TextInput required label="Job title" type="text" name="job-title" id="form-job-title"
					></TextInput>
				{/if}
				<TextInput required label="First name" type="text" name="first-name" id="form-first-name"
				></TextInput>
				<TextInput required label="Last name" type="text" name="last-name" id="form-last-name"
				></TextInput>
				<TextInput required label="Email" type="email" name="email" id="form-email"></TextInput>
			{/if}
			<Button
				type="submit"
				label="Access"
				height="4rem"
				disabled={!disclaimer_consent}
				disabled_notice="You need to accept the disclaimer accessing the materials"
			></Button>
		{/if}
		<div class="its-me h-2 w-2" use:scrollIntoView></div>
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
	.carer {
		background: color-mix(in srgb, var(--theme-colour-4) 10%, white 80%);
	}
	.healthcare-professional {
		background: color-mix(in srgb, var(--theme-colour-5) 10%, white 80%);
	}
</style>
