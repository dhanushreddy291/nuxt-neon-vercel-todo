import { db } from '~/server/utils/db';
import { todos } from '~/server/db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
    return await db.select().from(todos).orderBy(desc(todos.createdAt));
});