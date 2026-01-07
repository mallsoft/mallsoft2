<script lang="ts">
	import { page } from '$app/state';
	import CreateListItem from '$lib/components/todolist/CreateListItem.svelte';
	import ItemList from '$lib/components/todolist/ItemList.svelte';
	import ItemListName from '$lib/components/todolist/ItemListName.svelte';

	let listIdSlug = $derived(page.params.listId!);
</script>

<ItemListName listId={listIdSlug} />
<a href="/todo">back</a>

<CreateListItem listId={listIdSlug} />
<ItemList listId={listIdSlug} />
