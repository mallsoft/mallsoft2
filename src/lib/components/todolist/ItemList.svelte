<script lang="ts">
	import { getTodoListItems } from '$lib/functions/todo.remote';

	let { listId }: { listId: string } = $props();

	let items = $derived(await getTodoListItems({ listId }));
</script>

{#if items.length !== 0}
	<ul>
		{#each items as { item }}
			<li>{item}</li>
		{/each}
	</ul>
{:else}
	<p>Empty list</p>
{/if}

<style>
	@starting-style {
		li {
			opacity: 0;
		}
	}
</style>
