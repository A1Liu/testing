# testing

Things I have encountered:

1. `"target": "esnext"`
2. Property 'name' has no initializer and is not definitely assigned in the constructor. - `"strictPropertyInitialization": false,` in `tsconfig.json`
3. So many instances of `Please do npm i --save-dev @types/blah`
4. `` Cannot find module `@karimsa/tinyorm`  `` - Installed the wrong version
5. `Error: relation "tinyorm.migrations" does not exist` - need to call `initMigrations`
6. `Error: Cannot rerun migration` - need to be globally unique
7. Tried to do auto-migrations with `executeMigrations` - can use `conn.synchronizeEntity` instead
8. Was confused for a bit because some methods are on `pool` and others are on `conn`
9. Generated columns? set a default value in the migration, then don't ask for the column on insert
10. Why is `createSimpleQueryBuilder().from(User)` not just `createSimpleQueryBuilder(User)`

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
