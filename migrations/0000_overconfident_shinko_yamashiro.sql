CREATE TABLE IF NOT EXISTS "Announcements" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Subject" text NOT NULL,
	"Content" text NOT NULL,
	"ExpireDate" timestamp NOT NULL,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	"UpdatedDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "News" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Subject" text NOT NULL,
	"Content" text NOT NULL,
	"ExpireDate" timestamp NOT NULL,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	"UpdatedDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Roles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"RoleName" text NOT NULL,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	"UpdatedDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UsersRoles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" serial NOT NULL,
	"RoleId" serial NOT NULL,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	"UpdatedDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Email" text NOT NULL,
	"Password" text NOT NULL,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	"UpdatedDate" timestamp NOT NULL
);
