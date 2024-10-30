import { drizzle } from "drizzle-orm/d1";

import * as schema from "@stratokit/db/schema";

export const db = drizzle(process.env.DB, { schema, logger: true });
