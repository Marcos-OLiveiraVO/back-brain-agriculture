-- CreateTable
CREATE TABLE "producer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farm" (
    "id" SERIAL NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "total_area" DECIMAL(10,2) NOT NULL,
    "arable_area" DECIMAL(10,2) NOT NULL,
    "vegetable_area" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvest" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "harvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crop" (
    "id" SERIAL NOT NULL,
    "harvest_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "crop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "producer_cnpj_cpf_idx" ON "producer"("cnpj", "cpf");

-- CreateIndex
CREATE INDEX "farm_producer_id_idx" ON "farm"("producer_id");

-- CreateIndex
CREATE INDEX "harvest_farm_id_idx" ON "harvest"("farm_id");

-- CreateIndex
CREATE INDEX "crop_harvest_id_idx" ON "crop"("harvest_id");

-- AddForeignKey
ALTER TABLE "farm" ADD CONSTRAINT "farm_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvest" ADD CONSTRAINT "harvest_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop" ADD CONSTRAINT "crop_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "harvest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
