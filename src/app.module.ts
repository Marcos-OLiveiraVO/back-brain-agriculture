import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';
import { FarmModule } from 'modules/farm/farm.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProducerModule, FarmModule],
})
export class AppModule {}
