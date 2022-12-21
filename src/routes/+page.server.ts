import type { PageServerLoad, Actions } from './$types';
import { getPool, User } from '../lib/server/entities';
import { createInsertBuilder, createSimpleQueryBuilder } from '@karimsa/tinyorm';
import { parseFormData } from '../lib/server/parsing';
import { z } from 'zod';

export const actions: Actions = {
  createUser: async ({ cookies, request }) => {
    const { username, name } = await parseFormData(request, {
      username: z.string(),
      name: z.string()
    });

    const pool = await getPool();
    const result = await pool.withTransaction(async (conn) => {
      return createInsertBuilder()
        .into(User)
        .withColumns(['username', 'name'])
        .addRows([{ username, name }])
        .returning(['id'])
        .execute(conn);
    });

    return result[0];
  }
};

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load: PageServerLoad = async ({ params, url }) => {
  const pool = await getPool();
  const output = await pool.withTransaction(async (conn) => {
    return await createSimpleQueryBuilder().from(User).selectAll().getOne(conn);
  });

  return { output };
};
