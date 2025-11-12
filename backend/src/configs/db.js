import pgPromise from "pg-promise";
import { config } from "./env.js";

const pgp = pgPromise();

const db = pgp(config.db);

export default db;
