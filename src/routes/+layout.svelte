<script lang="ts">
	import Error from './+error.svelte';

	import './global.css';
	import favicon from '$lib/assets/favicon.png';
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';

	type SiteLink = { href: ResolvedPathname; text: string };

	const footerLinks: SiteLink[] = [
		{
			href: '/',
			text: 'index'
		},
		{
			href: '/div',
			text: 'div'
		}
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>mallsoft.dev</title>
	<meta
		name="description"
		content="DX-focused developer building human-first stuff"
	/>
</svelte:head>
<main>
	{@render children()}
</main>

<footer>
	{#each footerLinks as { href, text }}
		{@const current = href === page.url.pathname ? 'page' : null}
		<a {href} aria-current={current}> {text}</a>
	{/each}
</footer>

<style>
	main {
		padding: min(7cqh, 10ch) min(5cqw, 5ch);
		text-wrap: balance;
		max-width: 50ch;
	}

	footer {
		background-color: rgba(255, 255, 255, 0.001);
		margin-top: auto;
		padding: min(2cqh, 2ch) min(5cqw, 5ch);
		display: flex;
		flex-wrap: wrap;
		gap: 1em;

		overflow: hidden;

		font-size: 0.85em;

		width: 100%;
	}

	footer a {
		padding: 0 0.6em;
		border-radius: 5px;
	}

	footer a[aria-current] {
		background-color: color-mix(in srgb, currentColor, rgba(0, 0, 0, 0) 90%);
	}
</style>
