# testing


Things I have encountered:
1. `"target": "esnext"`
2. Property 'name' has no initializer and is not definitely assigned in the constructor. - `"strictPropertyInitialization": false,` in `tsconfig.json`
3. So many instances of `Please do npm i --save-dev @types/blah`
4. ``Cannot find module `@karimsa/tinyorm` `` - Installed the wrong version
5. `Error: relation "tinyorm.migrations" does not exist` - need to call `initMigrations`
6. `Error: Cannot rerun migration` - need to be globally unique
7. Tried to do auto-migrations with `executeMigrations` - can use `conn.synchronizeEntity` instead
8. Was confused for a bit because some methods are on `pool` and others are on `conn`