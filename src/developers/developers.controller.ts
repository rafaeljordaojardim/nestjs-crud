import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  findAll() {
    return this.developersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const developer = await this.developersService.findOne(id);
    if(!developer) throw new NotFoundException();
    return developer;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.developersService.update(id, updateDeveloperDto);
    if(!developer) throw new NotFoundException();
    return developer;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.developersService.remove(id);
  }
}
