import { db } from '~/server/utils/db';
import { todos } from '~/server/db/schema';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const [newTodo] = await db.insert(todos).values({ text: body.text }).returning();
    return newTodo;
});