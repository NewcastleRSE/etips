<script lang="ts">
	import { getId } from '@arturoguzman/art-ui'
	import Player from '@vimeo/player'
	import { onDestroy } from 'svelte'
	export let id = getId()
	export let video_id: string | number = 0
	let video: Player | null = null
	const mountVideo = (e: HTMLElement) => {
		setTimeout(() => {
			video = new Player(e, {
				id: Number(video_id),
				autoplay: false,
				muted: false,
				controls: true,
				loop: false,
				quality: 'auto',
				width: e.getBoundingClientRect().width,
				dnt: true,
				portrait: false,
				title: false,
				byline: false
			})
		}, 1000)
	}
	onDestroy(() => {
		if (video) video.destroy()
	})
</script>

<div class="vimeo-video overflow-hidden" {id} use:mountVideo></div>
