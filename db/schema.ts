import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const newsTable = sqliteTable("News", {
    id: integer("Id").primaryKey(),
    imageId: integer('ImageId').references(() => newsImagesTable.id, { onDelete: 'cascade' }),
    subject: text("Subject").notNull(),
    content: text("Content").notNull(),
    expireDate: text("ExpireDate").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const newsImagesTable = sqliteTable("NewsImages", {
    id: integer("Id").primaryKey(),
    imageName: text("ImageName").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const annoncementsTable = sqliteTable("Announcements", {
    id: integer("Id").primaryKey(),
    imageId: integer('ImageId').references(() => annoncementsImageTable.id, { onDelete: 'cascade' }),
    subject: text("Subject").notNull(),
    content: text("Content").notNull(),
    expireDate: text("ExpireDate").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const annoncementsImageTable = sqliteTable("AnnouncementsImages", {
    id: integer("Id").primaryKey(),
    imageName: text("ImageName").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const rolesTable = sqliteTable("Roles", {
    id: integer("Id").primaryKey(),
    roleName: text("RoleName").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const usersRoleTable = sqliteTable("UsersRoles", {
    id: integer("Id").primaryKey(),
    userId: integer('UserId')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
    roleId: integer('RoleId')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const usersTable = sqliteTable("Users", {
    id: integer("Id").primaryKey(),
    name: text("Name").notNull(),
    surname: text("Surname").notNull(),
    email: text("Email").notNull(),
    password: text("Password").notNull(),
    createdDate: text('CreatedDate')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
    updatedDate: integer('UpdatedDate', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;

export type InsertUserRole = typeof usersRoleTable.$inferInsert;
export type SelectUserRole = typeof usersRoleTable.$inferSelect;

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;

export type InsertNewsImage = typeof newsImagesTable.$inferInsert;
export type SelectNewsImage = typeof newsImagesTable.$inferSelect;

export type InsertAnnouncement = typeof annoncementsTable.$inferInsert;
export type SelectAnnouncement = typeof annoncementsTable.$inferSelect;

export type InsertAnnouncementImage = typeof annoncementsImageTable.$inferInsert;
export type SelectAnnouncementImage = typeof annoncementsImageTable.$inferSelect;