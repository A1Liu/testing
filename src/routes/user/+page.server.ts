import type { PageServerLoad } from './$types';
import { User, withConnection } from '$lib/server/entities';
import { sql, createSimpleQueryBuilder } from '@karimsa/tinyorm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params, url }) => {
  const userid = cookies.get('userid');
  if (!userid) throw redirect(303, '/');

  return await withConnection(async (conn) => {
    console.log(userid);
    const output = await createSimpleQueryBuilder()
      .from(User)
      .selectAll()
      .addWhereRaw(sql`id = ${userid}::uuid`)
      .getOne(conn);
    console.log(output);
    const output1 = await createSimpleQueryBuilder().from(User).selectAll().getMany(conn);
    console.log(output1);

    return { output };
  });
};
