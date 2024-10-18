import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const newsTable = pgTable("News", {
    id: serial("Id").primaryKey(),
    subject: text("Subject").notNull(),
    content: text("Content").notNull(),
    expireDate: timestamp("ExpireDate").notNull(),
    createdDate: timestamp("CreatedDate").notNull().defaultNow(),
    updatedDate: timestamp("UpdatedDate").notNull().$onUpdate(() => new Date()),
})

export const annoncementsTable = pgTable("Announcements", {
    id: serial("Id").primaryKey(),
    subject: text("Subject").notNull(),
    content: text("Content").notNull(),
    expireDate: timestamp("ExpireDate").notNull(),
    createdDate: timestamp("CreatedDate").notNull().defaultNow(),
    updatedDate: timestamp("UpdatedDate").notNull().$onUpdate(() => new Date()),
})

export const rolesTable = pgTable("Roles", {
    id: serial("Id").primaryKey(),
    roleName: text("RoleName").notNull(),
    createdDate: timestamp("CreatedDate").notNull().defaultNow(),
    updatedDate: timestamp("UpdatedDate").notNull().$onUpdate(() => new Date()),
})

export const usersRole = pgTable("UsersRoles", {
    id: serial("Id").primaryKey(),
    userId: serial("UserId").notNull(),
    roleId: serial("RoleId").notNull(),
    createdDate: timestamp("CreatedDate").notNull().defaultNow(),
    updatedDate: timestamp("UpdatedDate").notNull().$onUpdate(() => new Date()),
})

export const usersTable = pgTable("Users", {
    id: serial("Id").primaryKey(),
    email: text("Email").notNull(),
    password: text("Password").notNull(),
    createdDate: timestamp("CreatedDate").notNull().defaultNow(),
    updatedDate: timestamp("UpdatedDate").notNull().$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;

export type InsertUserRole = typeof usersRole.$inferInsert;
export type SelectUserRole = typeof usersRole.$inferSelect;

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;

export type InsertAnnouncement = typeof annoncementsTable.$inferInsert;
export type SelectAnnouncement = typeof annoncementsTable.$inferSelect;
