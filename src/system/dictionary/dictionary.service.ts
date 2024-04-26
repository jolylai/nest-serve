import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { QueryDictionaryItemDto } from './dictionary.dto';

@Injectable()
export class DictionaryService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginationItems(args: Prisma.DictionaryItemFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.dictionaryItem.findMany(args),
      this.prismaService.dictionaryItem.count({ where: args.where }),
    ]);
  }

  async pagination(args: Prisma.DictionaryFindManyArgs) {
    return this.prismaService.$transaction([
      this.prismaService.dictionary.findMany(args),
      this.prismaService.dictionary.count({ where: args.where }),
    ]);
  }

  async findById(id: number) {
    return this.prismaService.dictionary.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.DictionaryCreateInput) {
    return this.prismaService.dictionary.create({ data });
  }

  async update(id: number, data: Prisma.DictionaryUpdateInput) {
    return this.prismaService.dictionary.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prismaService.dictionary.delete({
      where: { id },
    });
  }
}
