<script lang="ts">
	let { children } = $props();
</script>

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
