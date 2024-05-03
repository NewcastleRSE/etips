<script>
	import { goto } from '$app/navigation'
	import Button from '../button/button.svelte'
	const copy = 'Best from the Left'
</script>

<nav class="grid h-12 w-screen md:h-16">
	<div class="nav-left-col flex items-center gap-2">
		<img src="/logo.webp" alt="etips logo" class=" w-32" />
		<p class="side-title w-full text-sm">{copy}</p>
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
		color: var(--theme-colour-3);
	}
</style>
