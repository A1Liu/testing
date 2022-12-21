import { createConnectionPool, Entity, Column, sql, createInsertBuilder } from '@karimsa/tinyorm';
import type { Connection } from '@karimsa/tinyorm';
import { v4 as uuid } from 'uuid';
import { memoize } from '../async';

export enum CompanyKind {
  Internal = 'Internal',
  Client = 'Client'
}

export enum LocationKind {
  Train = 'Train',
  TrainYard = 'TrainYard'
}

/**
 * Company that interacts in the system. Could be us, or could be a client.
 */
export const INTERNAL_COMPANY_ID = 'deadbeef-dead-beef-dead-deadbeefbeef';
export class Company extends Entity({ schema: 'app', tableName: 'company' }) {
  @Column({ type: 'uuid', defaultValue: sql`uuid_generate_v4()` })
  readonly id: string;

  @Column({ type: 'text' })
  readonly kind: CompanyKind;

  @Column({ type: 'text' })
  readonly name: string;

  @Column({ type: 'text' })
  readonly primary_contact_email: string;

  @Column({ type: 'text' })
  readonly primary_contact_phone: string;
}

/**
 * Physical train in the world
 */
export class Train extends Entity({ schema: 'app', tableName: 'train' }) {
  @Column({ type: 'uuid', defaultValue: sql`uuid_generate_v4()` })
  readonly id: string;

  /**
   * Company that owns this train
   */
  @Column({ type: 'uuid' })
  readonly owner: string;

  /**
   * A train line, e.g. 20W
   */
  @Column({ type: 'uuid' })
  readonly train_line: string;
}

export class TrainCar extends Entity({ schema: 'app', tableName: 'train_car' }) {
  @Column({ type: 'uuid', defaultValue: sql`uuid_generate_v4()` })
  readonly id: string;

  /**
   * Destination for this car's cargo
   */
  @Column({ type: 'uuid' })
  readonly destination: string;

  @Column({ type: 'text' })
  readonly registered_location_kind: LocationKind;

  /**
   * currently registered location for this train car; use this in conjunction with
   * registered_location_kind
   */
  @Column({ type: 'uuid' })
  readonly registered_location: string;
}

export class TrainYard extends Entity({ schema: 'app', tableName: 'train_yard' }) {
  @Column({ type: 'uuid', defaultValue: sql`uuid_generate_v4()` })
  readonly id: string;
}

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

  await pool.withTransaction(async (conn) => {
    const entities = [User, Company, Train, TrainCar, TrainYard];

    await conn.query(sql.finalize(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`));

    await conn.initMigrations();
    for (const entity of entities) {
      const migrations = await pool.getMigrationQueries(entity);

      console.log(`${entity.tableName} migrations:`, JSON.stringify(migrations));
      for (const mig of migrations) {
        console.log('suggested migration: (reason: ' + mig.reason + ')');
        for (const q of mig.queries) {
          console.log('   ', q.text);
          console.log('   values:', q.values);
        }
        console.log();
      }

      await conn.synchronizeEntity(entity);
    }

    await conn.query(
      sql.finalize(sql`
          INSERT INTO app.company
          (id, kind, name, primary_contact_email, primary_contact_phone)
          VALUES (
            ${INTERNAL_COMPANY_ID}::uuid, ${CompanyKind.Internal},
            ${'PizzaCo'}, ${'albertymliu@gmail.com'}, ${'+1 1234567890'}
          )
          ON CONFLICT DO NOTHING
      `)
    );
  });

  return pool;
});

export async function withConnection<T>(f: (conn: Connection) => Promise<T>): Promise<T> {
  const pool = await getPool();
  return pool.withTransaction(f);
}

getPool();
