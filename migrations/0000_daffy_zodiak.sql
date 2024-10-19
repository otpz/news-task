CREATE TABLE `AnnouncementsImages` (
	`Id` integer PRIMARY KEY NOT NULL,
	`ImageName` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer
);
--> statement-breakpoint
CREATE TABLE `Announcements` (
	`Id` integer PRIMARY KEY NOT NULL,
	`ImageId` integer,
	`Subject` text NOT NULL,
	`Content` text NOT NULL,
	`ExpireDate` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer,
	FOREIGN KEY (`ImageId`) REFERENCES `AnnouncementsImages`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `NewsImages` (
	`Id` integer PRIMARY KEY NOT NULL,
	`ImageName` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer
);
--> statement-breakpoint
CREATE TABLE `News` (
	`Id` integer PRIMARY KEY NOT NULL,
	`ImageId` integer,
	`Subject` text NOT NULL,
	`Content` text NOT NULL,
	`ExpireDate` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer,
	FOREIGN KEY (`ImageId`) REFERENCES `NewsImages`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Roles` (
	`Id` integer PRIMARY KEY NOT NULL,
	`RoleName` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer
);
--> statement-breakpoint
CREATE TABLE `UsersRoles` (
	`Id` integer PRIMARY KEY NOT NULL,
	`UserId` integer NOT NULL,
	`RoleId` integer NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer,
	FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`RoleId`) REFERENCES `Users`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`Id` integer PRIMARY KEY NOT NULL,
	`Name` text NOT NULL,
	`Surname` text NOT NULL,
	`Email` text NOT NULL,
	`Password` text NOT NULL,
	`CreatedDate` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`UpdatedDate` integer
);
