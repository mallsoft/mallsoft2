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

{@render children()}
