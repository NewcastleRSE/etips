<script lang="ts">
	import type { Card } from '$lib/types'

	export let card: Card
</script>

<iframe
	src={card.url?.replaceAll(
		'https://www.youtube.com/watch?v=',
		'https://www.youtube-nocookie.com/embed/'
	)}
	title={card.title ?? ''}
	class="aspect-video w-full"
></iframe>
