import { Module } from '@nestjs/common';
import { ItemsModule } from './items.module';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [ItemsModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsHttpModule {}
