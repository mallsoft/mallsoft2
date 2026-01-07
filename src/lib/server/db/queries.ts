import { eq } from 'drizzle-orm';
import { db } from './index';
import { todoLists, todoItems } from './schema';

export const todoQueries = {
	createList: async (name: string) => {
		const res = await db
			.insert(todoLists)
			.values({ listName: name })
			.returning();

		return res[0];
	},
	createItem: async (listId: string, item: string) => {
		const res = await db
			.insert(todoItems)
			.values({
				item,
				listId
			})
			.returning();

		return res[0];
	},
	deleteList: async (listId: string) => {
		return await db.delete(todoLists).where(eq(todoLists.id, listId));
	},
	deleteItem: async (itemId: string) => {
		return await db.delete(todoItems).where(eq(todoItems.id, itemId));
	},
	getListName: async (id: string) => {
		const res = await db
			.select({
				name: todoLists.listName
			})
			.from(todoLists)
			.where(eq(todoLists.id, id));

		return res[0];
	},
	getItems: async (id: string) => {
		return await db.select().from(todoItems).where(eq(todoItems.listId, id));
	}
};
