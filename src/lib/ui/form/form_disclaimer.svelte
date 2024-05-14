<script lang="ts">
	import type { Card } from '$lib/types'
	import CardText from '../cards/card_text.svelte'
	export let card: Card
	//TODO: dynamically select these data!
	// const disclaimer_data = data.page.cards.filter(
	// 	(c) => c.cards_id.id === 'a736fdb6-f22d-48ee-8f1f-5ac30b8450f2'
	// )[0].cards_id
</script>

<!-- <pre>{JSON.stringify(disclaimer_data, null, 2)}</pre> -->
<CardText {card}></CardText>
