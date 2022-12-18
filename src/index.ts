import express from "express";
import {Entity, Column, createSelectBuilder, } from "@karimsa/tinyorm";
import { createConnectionPool } from '@karimsa/tinyorm';
import {v4 as uuid} from "uuid"

const pool = createConnectionPool({
  user: 'postgres',
  password: 'password',
  port: 1313,
});

export class User extends Entity({ schema: "app", tableName: "users" }) {
  @Column({ type: "uuid" })
  readonly id: string;

  @Column({ type: "text" })
  readonly username: string;

  @Column({ type: "text" })
  readonly name: string;
}

const app = express();

app.post("/users/create/:username", async (req, res) => {
  const username = req.params.username;
  await pool.withClient(async client => {

    const user = await createInsert()
        .from(User)
        .addWhere(where => where("id").Equals(id))
        .selectAll()
        .getOne(client);
    if (!user) {
      res.json({});
      return;
    }

    res.json({
      id:
    });
  })
});

app.get("/users/info/:userid", async (req, res) => {
  const id = req.params.userid;
  await pool.withClient(async client => {
    const user = await createSelectBuilder()
        .from(User)
        .addWhere(where => where("id").Equals(id))
        .selectAll()
        .getOne(client);
    if (!user) {
      res.json({});
      return;
    }

    res.json(user);
  })
});

const start = async () => {
  const migrations = await pool.getMigrationQueries(User);

  console.log("migrations:", JSON.stringify(migrations));
  for (const mig of migrations) {
    console.log("suggested migration: (reason: " + mig.reason + ")");
    for (const q of mig.queries) {
      console.log("   ", q.text);
      console.log("   values:", q.values);
    }
    console.log();
  }

  await pool.withTransaction(async conn => {
    const entities = [User];

    await conn.initMigrations();
    for (const entity of entities) {
      await conn.synchronizeEntity(entity);
    }
  });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
};

start();

