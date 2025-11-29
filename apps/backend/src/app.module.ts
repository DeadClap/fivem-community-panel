import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CoreModule,
    HealthModule,
    UsersModule,
    DepartmentsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
