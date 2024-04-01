import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { PaginationQueryDto } from 'src/dtos/pagination.query.dto';

@Controller('charges')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargeService.create(createChargeDto);
  }

  @Get()
  findAll(@Query() params:PaginationQueryDto) {
    return this.chargeService.findAll(params);
  }

  @Get('/find')
  findByName(@Query('name') name:string) {
    return this.chargeService.findByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(+id, updateChargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeService.remove(+id);
  }
}
