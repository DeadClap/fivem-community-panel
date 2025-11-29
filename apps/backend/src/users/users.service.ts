import { Injectable } from '@nestjs/common';
import { PrismaService } from '../primsa/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from '../../generated/prisma/enums';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        discordId: dto.discordId,
        discordUsername: dto.discordUsername,
        communityName: dto.communityName ?? null,
        status: UserStatus.INACTIVE,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
