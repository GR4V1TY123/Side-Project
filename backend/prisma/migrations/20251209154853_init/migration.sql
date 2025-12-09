-- CreateTable
CREATE TABLE "Rides" (
    "ride_id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seats" SMALLINT NOT NULL DEFAULT 0,
    "fare" REAL NOT NULL DEFAULT 0,
    "source" JSONB NOT NULL,
    "destination" JSONB NOT NULL,
    "distance" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inactive',
    "passengers" INTEGER NOT NULL,
    "host_id" INTEGER NOT NULL,
    "source_lat" REAL,
    "dest_lat" REAL,
    "source_lng" REAL,
    "dest_lng" REAL,
    "route" JSONB,

    CONSTRAINT "Rides_pkey" PRIMARY KEY ("ride_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
