import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CostumerController } from './controllers/costumer/costumer.controller';

@Module({
  imports: [],
  controllers: [CostumerController],
  providers: [PrismaService],
})
export class AppModule {}