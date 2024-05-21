<script lang="ts">
	import { PUBLIC_CMS_ENDPOINT } from '$env/static/public'
	import type { CardsFile } from '$lib/types'
	export let media: CardsFile[] | null
</script>

{#if media}
	<video controls>
		<track kind="captions" />
		{#each media as m}
			{@const file = m.directus_files_id}
			{#if file && typeof file !== 'string' && file.id && file.type && file.type.includes('video')}
				<source src={`${PUBLIC_CMS_ENDPOINT}/assets/${file.id}`} type={file.type} />
			{/if}
		{/each}
	</video>
{/if}
