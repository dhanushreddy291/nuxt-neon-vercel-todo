import { db } from '~/server/utils/db';
import { todos } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    const [updatedTodo] = await db
        .update(todos)
        .set({ completed: body.completed })
        .where(eq(todos.id, Number(id)))
        .returning();
    return updatedTodo;
});