import { db } from '~/server/utils/db';
import { todos } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    await db.delete(todos).where(eq(todos.id, Number(id)));
    return { message: 'Todo deleted' };
});