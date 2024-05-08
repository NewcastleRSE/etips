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
	/* .accept-page { */
	/* 	margin-inline: auto; */
	/* 	background-color: var(--theme-colour-1); */
	/* 	border-width: 0 1px; */
	/* 	border-style: solid; */
	/* 	border-color: var(--theme-colour-4); */
	/* 	transition: all 0.3s ease-in-out; */
	/* } */
	/* .parent { */
	/* 	background: color-mix(in srgb, var(--theme-colour-4) 10%, white 80%); */
	/* } */
	/* .doctor { */
	/* 	background: color-mix(in srgb, var(--theme-colour-5) 10%, white 80%); */
	/* } */
</style>
