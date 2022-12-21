import type { Actions } from './$types';
import { User, withConnection } from '$lib/server/entities';
import { createInsertBuilder } from '@karimsa/tinyorm';
import { parseFormData } from '$lib/server/parsing';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  createUser: async ({ cookies, request }) => {
    const { username, name } = await parseFormData(request, {
      username: z.string(),
      name: z.string()
    });

    const result = await withConnection(async (conn) => {
      const [result] = await createInsertBuilder()
        .into(User)
        .withColumns(['username', 'name'])
        .addRows([{ username, name }])
        .returning(['id'])
        .execute(conn);

      return result;
    });

    if (result) {
      cookies.set('userid', result.id);
      throw redirect(301, '/user');
    }

    return result;
  }
};
