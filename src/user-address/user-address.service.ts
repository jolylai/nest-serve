import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async find(userId: number) {
    return this.prisma.userAddress.findMany({
      where: { userId },
    });
  }

  async create(userAddress: Prisma.UserAddressCreateInput) {
    return this.prisma.userAddress.create({
      data: userAddress,
    });
  }

  async update(addressId: number, updateInput: Prisma.UserAddressUpdateInput) {
    return this.prisma.userAddress.update({
      where: { id: addressId },
      data: updateInput,
    });
  }

  async delete(condition: Prisma.UserAddressDeleteArgs) {
    return this.prisma.userAddress.delete(condition);
  }
}
