<script lang="ts">
	import { getTodoListName, memorizeList } from '$lib/functions/todo.remote';
	import { onMount } from 'svelte';
	import QR from '../QR.svelte';
	import { page } from '$app/state';

	let { listId }: { listId: string } = $props();

	let listName = $derived((await getTodoListName({ listId })).name);

	onMount(() => {
		if (listName && listId) {
			memorizeList({ listName, listId });
		}
	});
</script>

<div>
	<h1>{listName}</h1>
	<QR text={page.url.toString()} />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 1em;
	}
</style>
