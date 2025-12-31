<script lang="ts">
	import './global.css';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

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

<Footer
	show={page.url.pathname === '/we'}
	links={[
		{
			text: 'QR Gen',
			href: '/qr'
		}
	]}
/>

<style>
	main {
		padding: min(7cqh, 10ch) min(5cqw, 5ch);
		text-wrap: balance;
		max-width: 50ch;
	}
</style>
