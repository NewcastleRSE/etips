<script lang="ts">
	export let data
	import AccessForm from '$lib/ui/form/access_form.svelte'
	let role = ''
</script>

<!-- TODO: fix scroll size on desktop -->
<!-- <div class="content-container min-h-screen w-screen overflow-x-hidden lg:w-full"> -->

<div
	class="accept-page overflow-y-scroll"
	class:doctor={role === 'doctor'}
	class:parent={role === 'parent'}
>
	<AccessForm {data}></AccessForm>
</div>

<style>
</style>
