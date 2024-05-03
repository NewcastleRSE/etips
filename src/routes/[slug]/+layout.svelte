<script lang="ts">
	import { goto } from '$app/navigation'
	import type { Page } from '$lib/types/index.js'
	import NavPages from '$lib/ui/nav/nav_pages.svelte'
	import NavTopics from '$lib/ui/nav/nav_topics.svelte'
	import Title from '$lib/ui/page/title.svelte'
	export let data
	const pages = data.pages as Page[]
</script>

<NavPages
	on:click={(e) => {
		goto(`/${e.detail}`)
	}}
	{pages}
></NavPages>
<Title
	on:click={() => {
		goto(`/${data.page.slug}`)
	}}
	slug={data.page.slug}
	title={data.page.title}
></Title>
<NavTopics
	on:click={(e) => {
		goto(`/${data.page.slug}/${e.detail}`)
	}}
	topics={data.topics}
></NavTopics>
<slot />
