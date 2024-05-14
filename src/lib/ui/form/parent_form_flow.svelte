<script lang="ts">
	import CardMedia from '../cards/card_media.svelte'
	import SelectionInput from './selection_input.svelte'
	import TextInput from './text_input.svelte'
	export let cards
</script>

<div class="parent-flow-form my-12">
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
		{#if cards.animation}
			<CardMedia card={cards.animation}></CardMedia>
		{/if}
	</SelectionInput>
</div>
