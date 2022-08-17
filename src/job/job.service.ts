import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  async pagination(args: Prisma.JobFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.job.findMany(args),
      this.prismaService.job.count({ where: args.where }),
    ]);
  }

  async create(data: Prisma.JobCreateInput) {
    return this.prismaService.job.create({ data });
  }

  async findById(jobId: number) {
    return this.prismaService.job.findUnique({
      where: { id: jobId },
    });
  }

  async update(jobId: number, data: Prisma.JobUpdateInput) {
    return this.prismaService.job.update({
      where: { id: jobId },
      data,
    });
  }

  async delete(jobId: number) {
    return this.prismaService.job.delete({
      where: { id: jobId },
    });
  }
}
