<script lang="ts">
	import type { Card } from '$lib/types'
	import CardText from '../cards/card_text.svelte'
	export let card: Card
</script>

<CardText {card}></CardText>
