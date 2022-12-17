import express from "express";
import { Entity, Column } from "@karimsa/tinyorm";
import { createConnectionPool } from '@karimsa/tinyorm';

const pool = createConnectionPool({

});

export class User extends Entity({ schema: "app", tableName: "users" }) {
  @Column({ type: "uuid" })
  readonly id: string;

  @Column({ type: "text" })
  readonly name: string;
}

const app = express();
app.get("/", (req, res) => {});
