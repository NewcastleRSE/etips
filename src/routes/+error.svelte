<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$lib/ui/button/button.svelte'
</script>

<div class="error-page flex h-full w-full flex-col items-center justify-center">
	<h1 class="error-message">{$page.error?.message}</h1>
	<div class="error-button my-4 h-12">
		<Button
			on:click={() => {
				goto('/')
			}}>Go home?</Button
		>
	</div>
</div>

<style>
	.error-message {
		font-family: var(--theme-font-subtitle);
		font-size: 1.4rem;
	}
	.error-button {
		font-family: var(--theme-font-paragraph);
	}
</style>
