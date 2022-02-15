-- CreateTable
CREATE TABLE "_AnimalToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToUser_AB_unique" ON "_AnimalToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToUser_B_index" ON "_AnimalToUser"("B");

-- AddForeignKey
ALTER TABLE "_AnimalToUser" ADD FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
