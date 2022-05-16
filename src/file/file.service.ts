import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany() {
    return this.prisma.file.findMany({});
  }

  async create(data: Prisma.fileCreateInput) {
    return this.prisma.file.create({ data });
  }

  async delete(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }
}
