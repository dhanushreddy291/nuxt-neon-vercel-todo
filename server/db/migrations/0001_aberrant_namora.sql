CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "priority" "priority" DEFAULT 'medium' NOT NULL;