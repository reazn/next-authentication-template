import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, pg } from "./index";

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  await pg.end();
}

main();