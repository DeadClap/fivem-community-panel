import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: string;
  discordId: string;
  discordUsername: string;
  communityName?: string;
}

@Injectable()
export class UsersService {
  // TEMP: in-memory store until DB is wired
  private users = new Map<string, User>();
  private idCounter = 1;

  create(dto: CreateUserDto): User {
    const id = String(this.idCounter++);
    const user: User = { id, ...dto };
    this.users.set(id, user);
    return user;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User | undefined {
    return this.users.get(id);
  }
}
