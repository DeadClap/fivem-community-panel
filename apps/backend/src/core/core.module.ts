// apps/backend/src/core/core.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule],
})
export class CoreModule {}
