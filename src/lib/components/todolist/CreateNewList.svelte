<script>
	import { createTodoList } from '$lib/functions/todo.remote';
</script>

<form {...createTodoList}>
	<input
		type="text"
		name="todoName"
		required
		minlength="1"
		maxlength="100"
		autocomplete="off"
	/>
	<button type="submit">Create</button>
</form>
