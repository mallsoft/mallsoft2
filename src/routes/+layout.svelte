<script lang="ts">
	import './global.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		scrollbar-gutter: stable both-edges;
		color: #343195;
		font-weight: normal;
		font-size: x-large;
		font-family: Verdana, sans-serif;
		line-height: 1.85;
	}

	:global(body) {
		margin: 0;
	}

	@media (width < 600px) {
		:global(:root) {
			font-size: large;
			line-height: 1.6;
		}
	}
</style>
