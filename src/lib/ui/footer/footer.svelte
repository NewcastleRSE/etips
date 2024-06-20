<script>
	import { goto } from '$app/navigation'
	export let data
</script>

<footer class="fixed bottom-0 left-0 grid h-12 w-screen grid-cols-2 md:h-16">
	<div class="footer-left-col h-full pl-4">
		<img src="/nu_logo.png" class="h-12 object-contain md:h-16" />
		<img src="" alt="" />
	</div>
	<div class="footer-right-col flex justify-end gap-4 pr-4">
		{#each data.pages.filter((p) => p.category === 'research') as page}
			<button
				on:click={() => {
					goto(`/pages/${page.slug}`)
				}}>{page.title}</button
			>
		{/each}
	</div>
</footer>

<style>
	footer {
		z-index: 999;
		border-top: 1px solid var(--theme-colour-4);
		background-color: var(--theme-colour-1);
	}
	button {
		color: var(--theme-colour-4);
		transition: all 0.3s ease-in-out;
	}
	button:hover {
		color: var(--theme-colour-3);
	}
</style>
