import { Injectable } from '@nestjs/common';
import Excel from 'exceljs';

@Injectable()
export class ExcelService {
  // constructor(private readonly prisma: PrismaService) {}

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
