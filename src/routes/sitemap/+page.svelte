<script lang="ts">
	import { goto } from '$app/navigation'
	export let data
</script>

<div class="page">
	{#each data.sitemap as page}
		<button
			class="mb-4 rounded-lg border border-black bg-white p-4"
			class:restricted={page.category === 'restricted'}
			on:click|self={() => {
				goto(`${page.category === 'research' ? '/pages/' : '/'}${page.slug}`)
			}}
		>
			<h2 class="title">{page.title}</h2>
			<p class="text">Page type: {page.category}</p>
			<p class="text">
				Path: {page.category === 'research' ? '/pages/' : '/'}{page.slug}
			</p>
			<div class="page-topics mt-4 flex flex-col gap-2">
				{#if page.topics}
					{#each page.topics as topic}
						<button
							class="rounded border border-black bg-white px-3 py-1 text-left"
							on:click={() => {
								goto(`${page.category === 'research' ? '/pages/' : '/'}${page.slug}/${topic.slug}`)
							}}
						>
							<p class="text">{topic.title}</p>
						</button>
					{/each}
				{/if}
			</div>
		</button>
	{/each}
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow-y: scroll;
		gap: 1rem;
		padding: 1rem;
	}
	.title {
		color: var(--theme-colour-3);
		font-family: var(--theme-font-subtitle);
		font-size: 1.85rem;
		font-weight: 600;
	}
	.text {
		font-family: var(--theme-font-paragraph);
		color: var(--theme-colour-3);
	}
	.restricted {
		background-color: color-mix(in oklab, var(--theme-colour-6) 20%, white 80%);
	}
	@media (min-width: 768px) {
		.page {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	@media (min-width: 1280px) {
		.page {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}
	@media print {
		.page {
			grid-template-columns: 1fr 1fr;
		}
		.page-topics {
			width: 40vw;
		}
	}
</style>
