<script lang="ts">
	import { page } from '$app/stores'
	export let data
	import AccessForm from '$lib/ui/form/access_form.svelte'
	import { genTitle } from '$lib/utils/seo.js'
	let role = ''
</script>

<svelte:head>
	{#key $page}
		<title>{genTitle(['Welcome'])}</title>
	{/key}
</svelte:head>

<!-- TODO: fix scroll size on desktop -->
<!-- <div class="content-container min-h-screen w-screen overflow-x-hidden lg:w-full"> -->

<div
	class="accept-page overflow-y-scroll"
	class:doctor={role === 'healthcare-professional'}
	class:parent={role === 'carer'}
>
	<AccessForm {data}></AccessForm>
</div>

<style>
</style>
