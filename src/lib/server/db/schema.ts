import { pgTable, serial, integer } from 'drizzle-orm/pg-core';

export const table = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});
