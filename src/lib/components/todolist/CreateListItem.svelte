<script lang="ts">
	import { createListItem } from '$lib/functions/todo.remote';
	import { navigating } from '$app/state';

	let { listId }: { listId: string } = $props();
</script>

<form {...createListItem}>
	<input required type="text" name="item" autocomplete="off" />
	<input required type="hidden" name="listId" value={listId} />
	<button type="submit">Add</button>
</form>
