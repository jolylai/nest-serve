import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateDepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ parentId, ...data }: CreateDepartmentDto) {
    return this.prismaService.department.create({
      data: {
        ...data,
        parent: { connect: { id: parentId } },
      },
    });
  }

  async pagination(args: Prisma.DepartmentFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.department.findMany(args),
      this.prismaService.department.count({ where: args.where }),
    ]);
  }

  async findById(deptId: number) {
    return this.prismaService.department.findUnique({
      where: { id: deptId },
    });
  }

  async findByParentId(parentId: number) {
    return this.prismaService.department.findMany({
      where: { parentId },
    });
  }

  async findSubTree(id: number) {
    const subTree = await this.prismaService.department.findUnique({
      where: { id },
      include: { children: true },
    });
    return [subTree];
  }

  async update(deptId: number, data: Prisma.DepartmentUpdateInput) {
    return this.prismaService.department.update({
      where: { id: deptId },
      data,
    });
  }

  async delete(deptId: number) {
    return this.prismaService.department.delete({
      where: { id: deptId },
    });
  }
}
