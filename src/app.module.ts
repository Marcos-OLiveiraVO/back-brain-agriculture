import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProducerModule],
})
export class AppModule {}
