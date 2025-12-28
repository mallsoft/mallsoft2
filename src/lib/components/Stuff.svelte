<script>
	const paths = [
		{
			href: '/qr',
			desc: 'QR'
		}
	];
</script>

{#each paths as { href, desc }}
	<nav>
		<a {href}>{desc}</a>
	</nav>
{/each}

<style>
	nav {
		margin-top: 3em;
	}
</style>
