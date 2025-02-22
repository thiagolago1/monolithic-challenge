import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, UsePipes, HttpCode, NotFoundException, Query } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCostumerBodySchema, CreateCostumerBodySchema } from 'src/schemas/create-costumer.schema';
import { UpdateCostumerBodySchema } from 'src/schemas/update-costumer.schema';

@Controller('/api/costumer')
export class CostumerController {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  @Get()
  helloRoute() {
    return 'Hello World!'
  }

  @Get("/hello-prisma")
  helloPrisma() {
    return this.prisma.helloPrisma()
  }

  @Get('/get-all-costumers')
  async getAllCostumers() {
    return await this.prisma.costumer.findMany()
  }

  @Get('/get-all-costumers-by-filter')
  async getAllCostumersByFilter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    const skip = (+page - 1) * +limit;
    const take = +limit;

    const costumers = await this.prisma.costumer.findMany({
      skip,
      take,
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      },
    });

    const totalCostumers = await this.prisma.costumer.count();

    return {
      data: costumers,
      total: totalCostumers,
      page,
      totalPages: Math.ceil(totalCostumers / limit),
    };
  }

  @Get(':id')
  async getCostumerById(@Param('id') id: string) {
    const costumer = await this.prisma.costumer.findUnique({
      where: { id }
    });

    if (!costumer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }

    return costumer;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCostumerBodySchema))
  @HttpCode(201)
  async createCostumer(@Body() body: CreateCostumerBodySchema) {
    const { name, phone, birth, address, email } = body;

    const userWithSameEmail = await this.prisma.costumer.findUnique({
      where: {
        email
      }
    })

    if(userWithSameEmail) {
      throw new ConflictException("User with same email address alreary exists.")
    }

    await this.prisma.costumer.create({
      data: {
        name,
        phone,
        birth,
        address,
        email
      }
    })
  }

  @Put(':id')
  async updateCostumer(
    @Param('id') id: string,
    @Body() body: UpdateCostumerBodySchema
  ) {
    const { name, phone, email, birth, address } = body;

    if (!name || !phone || !email || !birth || !address) {
      throw new ConflictException('All fields (name, phone, email, birth, address) are required.');
    }

    const existingCostumer = await this.prisma.costumer.findUnique({
      where: { id }
    });

    if (!existingCostumer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }

    return await this.prisma.costumer.update({
      where: { id },
      data: { name, phone, email, birth, address }
    });
  }

  @Delete()
  async deleteCostumer(@Body('ids') ids: string[]) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new NotFoundException('No valid customer IDs provided.');
    }
    await this.prisma.costumer.deleteMany({
      where: { id: { in: ids } }
    });
    return { message: 'Customers deleted successfully.' };
  }
}
