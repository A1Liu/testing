import { createSimpleQueryBuilder } from "@karimsa/tinyorm";
import {pool, User} from "$lib/entities.server";
import type { PageServerLoad } from "./$types";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

// export const load : PageServerLoad = async ({ params }) => {
//   const id = params.id;
//   const user = await pool.withClient(async client => {
//
//     const user = await createSimpleQueryBuilder()
//         .from(User)
//         .addWhere(where => where("id").Equals(id))
//         .selectAll()
//         .getOne(client);
//
//     return user;
//   });
//
//   return user;
// }

