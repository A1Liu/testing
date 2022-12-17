import express from "express";
import {Entity, Column, createSelectBuilder} from "@karimsa/tinyorm";
import { createConnectionPool } from '@karimsa/tinyorm';

const pool = createConnectionPool({
  user: 'postgres',
  password: 'password',
  port: 1313,
});

export class User extends Entity({ schema: "app", tableName: "users" }) {
  @Column({ type: "uuid" })
  readonly id: string;

  @Column({ type: "text" })
  readonly name: string;
}

const app = express();
app.get("/users/:userid", async (req, res) => {
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
  res.json();
});

const start = async () => {
  const migrations = await pool.getMigrationQueries(User);

  console.log("migrations:", JSON.stringify(migrations));
  for (const mig of migrations) {
    console.log("suggested migration: (reason: " + mig.reason + ")");
    for (const q of mig.queries) {
      console.log("   ", q.text, "\n");
      console.log("   values:", q.values);

    }
    console.log();
  }

  await pool.withTransaction(conn => conn.initMigrations());

  await pool.executeMigration("generated migrations", migrations);


  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
};

start();

