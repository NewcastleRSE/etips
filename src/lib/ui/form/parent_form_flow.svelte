<script lang="ts">
	import { scrollIntoView } from '$lib/utils/scroll'
	import CardText from '../cards/card_text.svelte'
	import SelectionInput from './selection_input.svelte'
	import TextInput from './text_input.svelte'
	export let cards
	let preterm = false
</script>

<div class="parent-flow-form my-12" use:scrollIntoView>
	<TextInput
		required
		label="Age of child (in weeks)"
		type="number"
		name="age-weeks"
		id="form-age-weeks"
	></TextInput>
	<SelectionInput
		required
		label="Was your baby born preterm (before 37 weeks gestation)? "
		option
		name="preterm"
		bind:checked={preterm}
	></SelectionInput>

	{#if preterm}
		<TextInput
			required
			label="How many weeks before the due date were they born?"
			type="number"
			name="age-preterm"
			id="form-age-preterm"
		></TextInput>
	{/if}
	<SelectionInput
		left_label="Left side of the brain affected - eTIPS RIGHT website"
		right_label="Right side of the brain affected - eTIPS LEFT website"
		required
		label="Side of brain affected"
		name="side-affected"
		information_label="More information"
		option
		open_information={true}
	>
		{#if cards.animation}
			<CardText card={cards.animation}></CardText>
		{/if}
	</SelectionInput>
</div>
