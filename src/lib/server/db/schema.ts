import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const todoLists = pgTable('todo', {
	id: uuid('id').primaryKey().defaultRandom(),
	listName: text('list_name')
});

export const todoItems = pgTable('todo_items', {
	id: uuid('id').primaryKey().defaultRandom(),
	item: text('item').notNull().default(''),
	status: text('status'),
	listId: uuid('list_id')
		.notNull()
		.references(() => todoLists.id, { onDelete: 'cascade' })
});
