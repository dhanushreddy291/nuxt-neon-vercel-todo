import { pgTable, serial, text, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);


export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    completed: boolean('completed').default(false).notNull(),
    priority: priorityEnum().default('medium').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});