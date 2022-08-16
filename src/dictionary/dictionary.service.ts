import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DictionaryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.DictionaryCreateInput) {
    return this.prismaService.dictionary.create({ data });
  }
}
