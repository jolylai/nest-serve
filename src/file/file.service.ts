import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import Excel from 'exceljs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(args: Prisma.fileFindManyArgs) {
    return this.prisma.file.findMany(args);
  }

  async findById(id: number) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async pagination(args: Prisma.fileFindManyArgs) {
    return this.prisma.$transaction([
      this.prisma.file.findMany(args),
      this.prisma.file.count({ where: args.where }),
    ]);
  }

  async create(data: Prisma.fileCreateInput) {
    return this.prisma.file.create({ data });
  }

  async delete(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }

  async parseExcel(excel: Buffer) {
    const workBook = new Excel.Workbook();
    await workBook.xlsx.load(excel);

    const workSheet = workBook.getWorksheet(1);

    const result = [];

    workSheet.eachRow((row) => {
      result.push(row.values);
    });

    return result;
  }
}
