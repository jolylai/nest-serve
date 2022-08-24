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

  async findById(id: number) {
    return this.prismaService.menu.findUnique({
      where: { id: id },
    });
  }

  async findChildren(where: Prisma.MenuWhereInput) {
    return this.prismaService.menu.findMany({
      where,
    });
  }

  async update(jobId: number, data: Prisma.MenuUpdateInput) {
    return this.prismaService.menu.update({
      where: { id: jobId },
      data,
    });
  }

  async upsert({
    id,
    ...data
  }: (Prisma.MenuUpdateInput | Prisma.MenuCreateInput) & { id?: number }) {
    return this.prismaService.menu.upsert({
      where: { id: id as number },
      create: data as Prisma.MenuCreateInput,
      update: data as Prisma.MenuUpdateInput,
    });
  }
}
