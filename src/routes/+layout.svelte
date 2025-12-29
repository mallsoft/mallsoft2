<script lang="ts">
	import './global.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>mallsoft.dev</title>
	<meta
		name="description"
		content="UX and DX-focused developer building accessible, human-centered software."
	/>
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	main {
		max-width: 50ch;
		padding: 2.5cqh min(5cqw, 5ch);
		padding-bottom: 10cqh;
		text-wrap: balance;
	}

	@media (width > 600px) {
		main {
			margin: 5cqh 10cqw;
		}
	}
</style>
