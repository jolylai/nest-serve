import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import Excel from 'exceljs';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(args: Prisma.FileFindManyArgs) {
    return this.prisma.file.findMany(args);
  }

  async findById(id: number) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async pagination(args: Prisma.FileFindManyArgs) {
    return this.prisma.$transaction([
      this.prisma.file.findMany(args),
      this.prisma.file.count({ where: args.where }),
    ]);
  }

  async create(data: Prisma.FileCreateInput) {
    return this.prisma.file.create({ data });
  }

  async delete(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }

  async parseExcel(filePath: string) {
    const workBook = new Excel.Workbook();
    await workBook.xlsx.readFile(filePath);

    const workSheet = workBook.getWorksheet(1);

    const result = [];

    workSheet.eachRow((row) => {
      result.push(row.values);
    });

    return result;
  }
}
