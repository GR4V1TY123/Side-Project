-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('ACTIVE', 'FULL', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACTIVE', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Rides" (
    "ride_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "begin_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seats" SMALLINT NOT NULL DEFAULT 1,
    "fare" DOUBLE PRECISION NOT NULL DEFAULT 26,
    "distance" DOUBLE PRECISION NOT NULL,
    "source" JSONB NOT NULL,
    "destination" JSONB NOT NULL,
    "source_lat" DOUBLE PRECISION NOT NULL DEFAULT 19.06394795,
    "source_lng" DOUBLE PRECISION NOT NULL DEFAULT 72.83579253728743,
    "dest_lat" DOUBLE PRECISION NOT NULL,
    "dest_lng" DOUBLE PRECISION NOT NULL,
    "route" JSONB,
    "status" "RideStatus" NOT NULL DEFAULT 'ACTIVE',
    "host_id" UUID NOT NULL,

    CONSTRAINT "Rides_pkey" PRIMARY KEY ("ride_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "ride_id" UUID NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rides_host_id_idx" ON "Rides"("host_id");

-- CreateIndex
CREATE INDEX "Rides_status_idx" ON "Rides"("status");

-- CreateIndex
CREATE INDEX "Rides_begin_at_idx" ON "Rides"("begin_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_user_id_idx" ON "User"("user_id");

-- CreateIndex
CREATE INDEX "Booking_user_id_idx" ON "Booking"("user_id");

-- CreateIndex
CREATE INDEX "Booking_ride_id_idx" ON "Booking"("ride_id");

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "Rides"("ride_id") ON DELETE CASCADE ON UPDATE CASCADE;
