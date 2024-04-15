import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  findFirst(options: Prisma.SessionFindFirstArgs) {
    return this.prisma.session.findFirst(options);
  }

  create(data: Prisma.SessionCreateInput) {
    return this.prisma.session.create({ data });
  }

  update(id: string, payload: Prisma.SessionUpdateInput) {
    return this.prisma.session.update({
      where: { id },
      data: payload,
    });
  }

  // async softDelete(criteria: {
  //   id?: Session['id'];
  //   user?: Pick<User, 'id'>;
  //   excludeId?: Session['id'];
  // }): Promise<void> {
  //   await this.sessionRepository.softDelete(criteria);
  // }
}
