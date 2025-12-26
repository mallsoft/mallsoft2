<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" as="style" href="./global.css" />
	<link rel="icon" href={favicon} />
	<title>mallsoft.dev</title>
	<meta
		name="description"
		content="UX and DX-focused developer building accessible, human-centered software."
	/>
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		color: #4929e6;
		font-weight: normal;
		font-size: x-large;
		font-family: Verdana, sans-serif;
		line-height: 1.7;
	}

	:global(body) {
		margin: 0;
	}

	@media (width < 600px) {
		:global(:root) {
			font-size: large;
		}
	}
</style>
