import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async pagination(args: Prisma.RoleFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.role.findMany(args),
      this.prismaService.role.count({ where: args.where }),
    ]);
  }

  async create(data: Prisma.RoleCreateInput) {
    return this.prismaService.role.create({ data });
  }

  async findById(id: number) {
    return this.prismaService.role.findUnique({
      where: { id },
    });
  }

  async delete(roleId: number) {
    return this.prismaService.role.delete({
      where: { id: roleId },
    });
  }
}
