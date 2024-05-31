<script lang="ts">
	import { scrollIntoView } from '$lib/utils/scroll'
	import CardText from '../cards/card_text.svelte'
	import SelectionInput from './selection_input.svelte'
	import TextInput from './text_input.svelte'
	export let cards
</script>

<div class="parent-flow-form my-12" use:scrollIntoView>
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
		left_label="Left side of brain affected"
		right_label="Right side of brain affected"
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
