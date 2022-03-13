-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/bXAh5Q
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Users" (
    "id" INT   NOT NULL,
    "email" TEXT   NOT NULL,
    "username" TEXT   NOT NULL,
    "image_url" TEXT   NOT NULL,
    "admin" BOOLEAN   NOT NULL,
    "paid" BOOLEAN   NOT NULL,
    "location" TEXT   NOT NULL,
    "password" TEXT   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_Users_email" UNIQUE (
        "email"
    ),
    CONSTRAINT "uc_Users_username" UNIQUE (
        "username"
    )
);

CREATE TABLE "Plates" (
    "id" INT   NOT NULL,
    "name" TEXT   NOT NULL,
    "description" TEXT   NOT NULL,
    "creator_id" TEXT   NOT NULL,
    CONSTRAINT "pk_Plates" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Plates_Foods" (
    "plate_id" INT   NOT NULL,
    "food_fdcid" TEXT   NOT NULL
);

ALTER TABLE "Plates" ADD CONSTRAINT "fk_Plates_creator_id" FOREIGN KEY("creator_id")
REFERENCES "Users" ("id");

ALTER TABLE "Plates_Foods" ADD CONSTRAINT "fk_Plates_Foods_plate_id" FOREIGN KEY("plate_id")
REFERENCES "Plates" ("id");

