var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import express from "express";
import { Entity, Column } from "@karimsa/tinyorm";
import { createConnectionPool } from '@karimsa/tinyorm';
const pool = createConnectionPool({});
export class User extends Entity({ schema: "app", tableName: "users" }) {
}
__decorate([
    Column({ type: "uuid" })
], User.prototype, "id", void 0);
__decorate([
    Column({ type: "text" })
], User.prototype, "name", void 0);
const app = express();
app.get("/", (req, res) => { });