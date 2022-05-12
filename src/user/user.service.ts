import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  async create(data: Prisma.userCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findMany(args: Prisma.userFindManyArgs) {
    return this.prisma.user.findMany(args);
  }
}
