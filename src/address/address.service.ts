import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async find(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async create(address: Prisma.AddressCreateInput) {
    return this.prisma.address.create({
      data: address,
    });
  }

  async update(addressId: number, updateInput: Prisma.AddressUpdateInput) {
    return this.prisma.address.update({
      where: { id: addressId },
      data: updateInput,
    });
  }

  async delete(condition: Prisma.AddressDeleteArgs) {
    return this.prisma.address.delete(condition);
  }
}
