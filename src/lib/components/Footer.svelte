<script lang="ts">
	import type { ResolvedPathname } from '$app/types';

	type FooterProps = {
		links: {
			text: string;
			href: ResolvedPathname;
		}[];
		show: boolean;
	};

	let { links, show }: FooterProps = $props();
</script>

<footer class:show>
	{#each links as { href, text }}
		<a {href}>{text}</a>
	{/each}
</footer>

<style>
	footer {
		background-color: rgba(255, 255, 255, 0.001);
		margin-top: auto;
		padding: min(2cqh, 2ch) min(5cqw, 5ch);
		display: flex;
		flex-wrap: wrap;
		gap: 0.8em;

		overflow: hidden;

		font-size: max(0.6em, 16px);
	}

	footer a {
		background-color: color-mix(in srgb, currentColor, rgba(0, 0, 0, 0) 90%);
		padding: 0 0.6em;
		border-radius: 5px;

		transform: translateY(400%);
		transition: transform 0.4s 0.4s;
	}

	footer:is(.show, :hover, :focus-within) a {
		transform: unset;
		transition: transform 0.4s;
	}
</style>
