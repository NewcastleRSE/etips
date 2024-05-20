<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { notify } from '$lib/stores/notify'
	import Button from '$lib/ui/button/button.svelte'
	export let data
	const closeDialog = () => {
		const dialog = document.getElementById('dialog-change-side') as HTMLDialogElement
		dialog.close()
	}
</script>

<dialog id="dialog-change-side" class="rounded-lg p-4">
	<h4>You're currently in</h4>
	<h3 class="my-4 border-b text-center text-xl">{data.copy}</h3>
	<form
		method="post"
		action="/?/change-side"
		use:enhance={({}) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					await invalidateAll()
					return closeDialog()
				}
				if (result.type === 'failure') {
					notify.send({ value: `${result.data?.message}` })
				}
			}
		}}
	>
		<div class="form-selection my-4 flex justify-between">
			<label for="side-selection">Select side to change to:</label>
			<select name="side-selection" id="side-selection" class="form-select">
				<option value="left" selected={$page.data.side === 'left'}>Left</option>
				<option value="right" selected={$page.data.side === 'right'}>Right</option>
			</select>
		</div>
		<div class="form-buttons flex w-full justify-between gap-4">
			<form method="dialog" class="flex-shrink-0">
				<Button label="Close"></Button>
			</form>
			<div class="close-button">
				<Button type="submit" label="Change side"></Button>
			</div>
		</div>
	</form>
</dialog>

<style>
	dialog {
		color: var(--theme-colour-3);
		background-color: var(--theme-colour-1);
		font-family: var(--theme-font-title-2);
	}
	dialog::backdrop {
		background-color: color-mix(in oklab, var(--theme-colour-3) 40%, #ffffff00 10%);
	}
	.form-select {
		border-radius: 0.5rem;
		border: 1px solid var(--theme-colour-4);
	}
	h3 {
		color: var(--theme-colour-4);
		font-weight: 700;
	}
</style>
