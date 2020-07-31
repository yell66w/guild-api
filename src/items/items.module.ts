import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsReposityory } from './items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsReposityory])],
  exports: [TypeOrmModule],
})
export class ItemsModule {}
