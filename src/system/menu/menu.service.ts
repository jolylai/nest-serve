import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateMenuDto, QueryMenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async pagination(args: Prisma.MenuFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.menu.findMany(args),
      this.prismaService.menu.count({ where: args.where }),
    ]);
  }

  async create({ parentId, ...data }: CreateMenuDto) {
    if (parentId)
      return this.prismaService.menu.create({
        data: {
          ...data,
          parent: { connect: { id: parentId } },
        },
      });

    return this.prismaService.menu.create({
      data,
    });
  }

  async findTree(queryMenuDto: QueryMenuDto) {
    let menuTree = { children: [] };
    // if(queryMenuDto)
    //   menuTree = await this.prismaService.menu.findFirst({
    // })

    menuTree = await this.prismaService.menu.findFirst({
      where: queryMenuDto ? queryMenuDto : { id: 0 },
      include: {
        children: {
          include: {
            children: {
              include: { children: true },
            }, // 递归查询子组织的子组织
          },
        },
      },
    });

    return menuTree?.children ?? [];
  }

  async findSubTree(menuId: number | null) {
    return this.prismaService.menu.findMany({
      where: { id: menuId },
      include: { children: true },
    });
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

  async delete(id: number) {
    return this.prismaService.menu.delete({
      where: { id },
    });
  }
}
