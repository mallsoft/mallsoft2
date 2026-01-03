import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const table = pgTable('todo', {
	id: uuid('id').primaryKey()
});
