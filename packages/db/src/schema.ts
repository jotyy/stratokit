import { relations } from "drizzle-orm";
import {
  blob,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  teamId: text("teamId"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const teams = sqliteTable("team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  dataStoreUsage: integer("dataStoreUsage").notNull().default(0),
  dataStoreLimit: integer("dataStoreLimit").notNull().default(3),
  defaultRole: text("defaultRole")
    .notNull()
    .$defaultFn(() => "member"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const teamMembers = sqliteTable("teamMember", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role")
    .notNull()
    .$defaultFn(() => "member"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const invites = sqliteTable("invite", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  role: text("role")
    .notNull()
    .$defaultFn(() => "member"),
  token: text("token").notNull().unique(),
  expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
  invitedBy: text("invitedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const dataStores = sqliteTable("dataStore", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const dataSources = sqliteTable("dataSource", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  dataStoreId: text("dataStoreId")
    .notNull()
    .references(() => dataStores.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  config: blob("config", { mode: "json" }).notNull(),
  status: text("status")
    .notNull()
    .$defaultFn(() => "pending"),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),

  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
}));

export const teamRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  invites: many(invites),
}));

export const teamMemberRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const inviteRelations = relations(invites, ({ one }) => ({
  team: one(teams, {
    fields: [invites.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invites.invitedBy],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type Datastore = typeof dataStores.$inferSelect;
export type NewDatastore = typeof dataStores.$inferInsert;
export type UpdateDatastore = Partial<Datastore>;
export type Datasource = typeof dataSources.$inferSelect;
export type NewDatasource = typeof dataSources.$inferInsert;
