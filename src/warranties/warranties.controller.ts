import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateWarrantyDTO } from './dto/create-warranty.dto';
import { WarrantiesService } from './warranties.service';
import { Warranty } from './interfaces/warranty.interface';

@Controller('warranties')
export class WarrantiesController {
  constructor(private readonly warrantiesService: WarrantiesService) {}

  @Get()
  async findAll(): Promise<Warranty[]> {
    return await this.warrantiesService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Warranty[]> {
    return await this.warrantiesService.findByUserId(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Warranty | null> {
    return await this.warrantiesService.findById(id);
  }

  @Post()
  async create(
    @Body() createWarrantyDto: CreateWarrantyDTO,
  ): Promise<Warranty> {
    return await this.warrantiesService.create(createWarrantyDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Warranty | null> {
    return await this.warrantiesService.deleteById(id);
  }
}
