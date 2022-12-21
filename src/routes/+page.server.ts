import type { PageServerLoad } from './$types';
import { hello } from '../lib/server/entities';
// import { createSimpleQueryBuilder } from "@karimsa/tinyorm";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
  // const output = await pool.withClient((client) => {
  // 	return { a: 12 };
  // });

  const output = hello();

  return { output };
};
