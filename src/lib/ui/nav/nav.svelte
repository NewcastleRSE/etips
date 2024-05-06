<script>
	import { goto } from '$app/navigation'
	import Button from '../button/button.svelte'
	//TODO:dynamically set copy
	const copy = 'Best from the Left'
</script>

<nav class="z-50 grid h-12 w-screen md:h-16">
	<div class="nav-left-col flex items-center">
		<button
			class="etips-button flex h-full items-center justify-center px-4 lg:w-64 lg:px-0"
			on:click={() => {
				goto(`/`)
			}}
		>
			<img src="/logo.webp" alt="etips logo" class=" w-32" />
		</button>
		<div
			class="side-title flex h-full w-full items-center px-4 text-sm lg:w-64 lg:justify-center lg:text-base"
		>
			<p>{copy}</p>
		</div>
	</div>
	<div class="nav-right-col flex items-center justify-end">
		<div class="nav-left-border h-full">
			<Button
				on:click={() => {
					goto('/access')
				}}
				label="Enter"
			></Button>
		</div>
	</div>
</nav>

<style>
	nav {
		background-color: var(--theme-colour-1);
		grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
		border-bottom: 1px solid var(--theme-colour-4);
	}
	.nav-left-border {
		border-left: 1px solid var(--theme-colour-4);
	}
	.side-title {
		color: var(--theme-colour-4);
		font-family: var(--theme-font-title);
		font-size: 1rem;
	}
	.etips-button {
		border-right: 1px solid var(--theme-colour-4);
	}
	@media (min-width: 1024px) {
		.side-title {
			border-right: 1px solid var(--theme-colour-4);
		}
	}
</style>
