<script lang="ts">
	import CardMedia from '../cards/card_media.svelte'
	import CardText from '../cards/card_text.svelte'
	import SelectionInput from './selection_input.svelte'
	import TextInput from './text_input.svelte'
	export let cards
	let specific_case = false
</script>

<div class="doctor-flow-form my-12">
	<SelectionInput
		bind:checked={specific_case}
		left_label="Specific case"
		right_label="General information"
		label="Accessing materials for a specific case or general information?"
		name="specific-case"
		option
	></SelectionInput>

	{#if specific_case}
		<TextInput
			required
			label="Age of child (in weeks)"
			type="number"
			name="age-weeks"
			id="form-age-weeks"
		></TextInput>
		<TextInput
			required
			label="Was your baby born preterm? And if so, how many weeks before the due date were they born?"
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
			option
			open_information={true}
		>
			{#if cards.animation}
				<CardText card={cards.animation}></CardText>
			{/if}
		</SelectionInput>
	{/if}
</div>
