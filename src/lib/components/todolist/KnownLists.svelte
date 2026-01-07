<script lang="ts">
	import {
		getKnownLists,
		forgetList,
		deleteList
	} from '$lib/functions/todo.remote';
	import { onMount } from 'svelte';

	let known = $state<Record<string, string>>();

	onMount(async () => {
		known = await getKnownLists();
	});
</script>

{#if known}
	<ul>
		{#each Object.entries(known) as [id, name]}
			<li>
				<div popover="" {id}>
					<form {...forgetList}>
						<input type="hidden" name="listId" value={id} />
						<button type="submit">Forget</button>
					</form>
					<form {...deleteList}>
						<input type="hidden" name="listId" value={id} />
						<button type="submit">Delete</button>
					</form>
				</div>

				<button popovertarget={id}>edit</button>

				<a href="/todo/{id}">{name}</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	li {
		display: flex;
		gap: 1em;
	}
</style>
