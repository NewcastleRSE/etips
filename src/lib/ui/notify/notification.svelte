<script lang="ts">
	import { notify } from '$lib/stores/notify'
	import { fly } from 'svelte/transition'
</script>

{#if $notify !== ''}
	<div
		id="notification"
		class="notification-container fixed left-0 top-0 p-2"
		in:fly|global={{ y: -200, duration: 1000 }}
		out:fly|global={{ y: -200, duration: 2000 }}
		on:pointerdown={() => {
			$notify = ''
		}}
	>
		<p
			class="notification-text flex h-20 cursor-pointer items-center justify-center p-4 text-sm md:text-lg"
		>
			{$notify}
		</p>
	</div>
{/if}

<style>
	.notification-text {
		border: 1px solid var(--theme-colour-3);
		color: var(--theme-colour-3);
		background-color: var(--theme-colour-1);
	}
	#notification {
		z-index: 100000;
	}
</style>
