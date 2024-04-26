import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByMobile(mobile: string) {
    return this.prisma.user.findUnique({
      where: { mobile },
    });
  }

  async findByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  async findFirst(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async create(data: Prisma.UserCreateInput) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    return this.prisma.user.create({
      data,
    });
  }

  async findMany(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany({
      ...args,
      // select: { id: true, name: true, createdAt: true, updatedAt: true },
    });
  }

  async pagination(args: Prisma.UserFindManyArgs) {
    return this.prisma.$transaction([
      this.prisma.user.findMany(args),
      this.prisma.user.count({ where: args.where }),
    ]);
  }

  async count() {
    return this.prisma.user.count();
  }
}
