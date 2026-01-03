import { db } from '$lib/server/db';
import type { Actions } from './$types';

export const actions: Actions = {
	createTodo: async (event) => {
		db.insert();
	}
};
