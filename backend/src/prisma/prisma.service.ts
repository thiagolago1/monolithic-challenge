import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit{
  constructor() {
    super({
      log: ['query', 'warn', 'error', 'info']
    })
  }

  onModuleInit() {
    return this.$connect()
  }
  onModuleDestroy() {
    return this.$disconnect()
  }
  helloPrisma() {
    return 'Hello Prisma!'
  }
}