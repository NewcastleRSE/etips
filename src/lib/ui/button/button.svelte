<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
	export let id: string = getId()
	export let selected = false
	export let label = ''
	export let height = '100%'
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button'
	export let disabled = false
	export let disabled_notice = ''
	export let local_id = getId()
	let start_position = 20
	const animate_title = (e: HTMLElement) => {
		const titleWidth = e.scrollWidth
		// const titleWidth = e.getBoundingClientRect().width
		const titleContainerWidth = document.getElementById(id)?.getBoundingClientRect().width || 0
		if (titleWidth > titleContainerWidth) {
			start_position = titleContainerWidth
			e.classList.add('overflow-animation')
		} else {
			e.classList.remove('overflow-animation')
		}
	}
</script>

{#key disabled}
	<button
		{id}
		{type}
		{disabled}
		on:click
		class:selected
		class="title-container w-full flex-shrink-0 snap-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-6 text-sm md:px-12 md:text-base"
		style="height: {height};"
		style:--start-position="{start_position}%"
	>
		<p use:animate_title>
			{disabled ? disabled_notice : label}
		</p>
		<slot />
	</button>
{/key}

<style>
	button {
		color: var(--theme-colour-4);
		border: 1px solid var(--theme-colour-4);
		transition: all 0.3s ease-in-out;
		position: relative;
	}
	button:hover:not(:disabled):not(:active) {
		color: var(--theme-colour-1);
		background-color: color-mix(in oklab, var(--theme-colour-5) 50%, white 70%);
	}
	button:active {
		background-color: color-mix(in oklab, var(--theme-colour-5) 70%, white 30%);
		scale: 0.97;
	}
	.selected {
		color: var(--theme-colour-1);
		background-color: var(--theme-colour-5);
	}
	button:disabled {
		opacity: 0.85;
		pointer-events: none;
	}
	:global(.overflow-animation) {
		animation: slideLeft 30s infinite;

		animation-timing-function: linear;
	}

	@keyframes slideLeft {
		from {
			transform: translateX(50%);
		}
		to {
			transform: translateX(-110%);
		}
	}
</style>
