import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: Prisma.AreaFindManyArgs) {
    return this.prisma.area.findMany(args);
  }
}
