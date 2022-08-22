import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.DepartmentCreateInput) {
    return this.prismaService.department.create({ data });
  }

  async pagination(args: Prisma.DepartmentFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.department.findMany(args),
      this.prismaService.department.count({ where: args.where }),
    ]);
  }

  async findById(jobId: number) {
    return this.prismaService.department.findUnique({
      where: { id: jobId },
    });
  }

  async findByParentId(parentId: number) {
    return this.prismaService.department.findMany({
      where: { parentId },
    });
  }

  async update(jobId: number, data: Prisma.DepartmentUpdateInput) {
    return this.prismaService.department.update({
      where: { id: jobId },
      data,
    });
  }
}
