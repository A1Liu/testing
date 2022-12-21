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
9. Was confused for a bit because `@Column({ defaultValue: n })` requires a `PreparedQuery`
10. Generated columns? set a default value in the migration, then don't ask for the column on insert
    - Online Docs are incomplete here
    - How do i generate UUIDv4 stuffs with current API
    - It seems the TSDocs actually have an example for exactly
      what I'm trying to do, but that example isn't on the online docs
    - OK actually the docs exist but the `params` section is kinda blank
      and I missed the link to `ColumnOptions` in the description, so I
      assumed the page was actually essentially blank and ignored it.
11. Why is `createSimpleQueryBuilder().from(User)` not just `createSimpleQueryBuilder(User)`
    or alternatively `SimpleQUeryBuilder.from(User)`
12. Foreign keys don't exist yet
