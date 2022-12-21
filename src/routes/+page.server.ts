import type { PageServerLoad } from './$types';
import { getPool, User } from '../lib/server/entities';
import { createSimpleQueryBuilder } from '@karimsa/tinyorm';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
  const pool = await getPool();
  const output = await pool.withClient(async (client) => {
    return await createSimpleQueryBuilder().from(User).selectAll().getOne(client);
  });

  return { output };
};
