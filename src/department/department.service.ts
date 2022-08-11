import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.DepartmentCreateInput) {
    return this.prismaService.department.create({ data });
  }
}
