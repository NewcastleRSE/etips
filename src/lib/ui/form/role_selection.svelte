<script lang="ts">
	import { scrollIntoView } from '$lib/utils/scroll'
	export let role: string
</script>

<div
	class="role-selection my-12 flex h-96 w-full grid-cols-2 flex-col gap-4 lg:grid"
	use:scrollIntoView
>
	<button
		class="role-selection-left-col flex h-full w-full flex-col items-center justify-evenly rounded-lg transition-all hover:opacity-100"
		class:opacity-60={role === '' || role === 'doctor'}
		class:opacity-100={role === 'parent'}
		class:selected={role === 'parent'}
		on:click={() => {
			role = 'parent'
		}}
		type="button"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-user"
			width="64"
			height="64"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#ffffff"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
			<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
		</svg>
		<p>Parent / Carer</p></button
	>
	<button
		class="role-selection-right-col flex h-full w-full flex-col items-center justify-evenly rounded-lg transition-all hover:opacity-100"
		class:opacity-60={role === '' || role === 'parent'}
		class:opacity-100={role === 'doctor'}
		class:selected={role === 'doctor'}
		on:click={() => {
			role = 'doctor'
		}}
		type="button"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-stethoscope"
			width="64"
			height="64"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#ffffff"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
			<path d="M8 15a6 6 0 1 0 12 0v-3" />
			<path d="M11 3v2" />
			<path d="M6 3v2" />
			<path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
		</svg>
		<p>Healthcare professional</p>
	</button>
</div>

<style>
	.role-selection {
		font-family: var(--theme-font-subtitle);
		font-size: 1.2rem;
	}
	.role-selection-left-col {
		color: var(--theme-colour-1);
		background: var(--theme-colour-4);
	}
	.role-selection-right-col {
		color: var(--theme-colour-1);
		background: var(--theme-colour-5);
	}
	.selected {
		border: 4px solid var(--theme-colour-3);
	}
</style>
