// apps/backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set');
    }

    const pool = new Pool({ connectionString: url });
    const adapter = (() => {
      try {
        return new PrismaPg(pool);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unknown Prisma adapter error';
        throw new Error(`Failed to initialize Prisma adapter: ${message}`);
      }
    })();

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
