import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async pagination(args: Prisma.MenuFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.menu.findMany(args),
      this.prismaService.menu.count({ where: args.where }),
    ]);
  }

  async create(data: Prisma.MenuCreateInput) {
    return this.prismaService.menu.create({ data });
  }

  async findById(jobId: number) {
    return this.prismaService.menu.findUnique({
      where: { id: jobId },
    });
  }

  async update(jobId: number, data: Prisma.MenuUpdateInput) {
    return this.prismaService.menu.update({
      where: { id: jobId },
      data,
    });
  }
}
