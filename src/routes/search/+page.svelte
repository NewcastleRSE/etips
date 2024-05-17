<script lang="ts">
	import { page } from '$app/stores'
	import { groupTopics } from '$lib/utils/topics'
	import SearchBar from '$lib/ui/search/search_bar.svelte'
	import SearchResultContainer from '$lib/ui/search/search_result_container.svelte'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	export let data

	$: results = $page.form ? groupTopics($page.form.results) : groupTopics(data.results)
	$: query = $page.url.searchParams.get('query') ?? $page.form?.query
	onMount(() => {
		if ($page.form === null) {
			goto('/')
		}
	})
</script>

<div class="search-page overflow-scroll">
	<SearchBar></SearchBar>
	<SearchResultContainer {results} {query}></SearchResultContainer>
</div>
