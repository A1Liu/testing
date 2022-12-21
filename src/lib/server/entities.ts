import { createConnectionPool, Entity, Column, sql } from '@karimsa/tinyorm';
import type { Connection } from '@karimsa/tinyorm';
import { v4 as uuid } from 'uuid';
import { memoize } from '../async';

export class User extends Entity({ schema: 'app', tableName: 'users' }) {
  @Column({ type: 'uuid', defaultValue: sql`uuid_generate_v4()` })
  readonly id: string;

  @Column({ type: 'text' })
  readonly username: string;

  @Column({ type: 'text' })
  readonly name: string;
}

export const getPool = memoize(async () => {
  const pool = createConnectionPool({
    user: 'postgres',
    password: 'password',
    port: 1313
  });

  const migrations = await pool.getMigrationQueries(User);

  console.log('migrations:', JSON.stringify(migrations));
  for (const mig of migrations) {
    console.log('suggested migration: (reason: ' + mig.reason + ')');
    for (const q of mig.queries) {
      console.log('   ', q.text);
      console.log('   values:', q.values);
    }
    console.log();
  }

  await pool.withTransaction(async (conn) => {
    const entities = [User];

    // await conn.query(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await conn.initMigrations();
    for (const entity of entities) {
      await conn.synchronizeEntity(entity);
    }
  });

  return pool;
});

export async function withConnection<T>(f: (conn: Connection) => Promise<T>): Promise<T> {
  const pool = await getPool();
  return pool.withTransaction(f);
}

getPool();
