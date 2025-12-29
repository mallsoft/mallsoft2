<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	onMount(() => {
		const comments = [
			`# Looking for the culprit?`,
			'# Page repo ➡ https://github.com/mallsoft/mallsoft2',
			'# Svelte docs ➡ https://svelte.dev/docs/kit/introduction',
			`# navigator confirms we are ${navigator.onLine ? 'online' : 'offline'}`,
			'# Page state snapshot below',
			JSON.stringify(page, null, 2)
		];

		comments.reverse().forEach((text) => {
			document.documentElement.insertBefore(
				document.createComment(text),
				document.documentElement.firstChild
			);
		});
	});
</script>

{#if page?.error}
	<h1>{page.status} {page.error.message} 🤨</h1>
{:else}
	<h1>Error? 🤯</h1>
	<pre>{JSON.stringify(page, null, 2)}</pre>
{/if}

<style>
	* {
		color: #e62f29;
	}
</style>
