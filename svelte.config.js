import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/*TODO: Upgrade back to sveltekit 1.0.0, vite 4.0.x, remove vite-plugin-svelte
 * from explicit dependencies. Right now vite 4 has a weird error where it refuses
 * to bundle CJS dependencies, this is a regression from 3.2.4, and all the new
 * stuff has this. The fix for this regression hasn't shipped yet, so for now
 * we're stuck in limbo.
 * - https://github.com/vitejs/vite/issues/11385
 *                                      - Albert Liu, Dec 20, 2022 Tue 22:31
 */

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter()
  }
};

export default config;
