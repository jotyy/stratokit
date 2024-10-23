import { drizzle } from "drizzle-orm/d1";

import * as schema from "@stratokit/db/schema";

import { env } from "@stratokit/db/env";

export const db = drizzle(env.DATABASE, { schema, logger: true });
