import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  create(@Body() createVendaDto: CreateVendaDto) {
   // return this.vendasService.create(createVendaDto);
  }

  @Get()
  findAll() {
    //return this.vendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
   // return this.vendasService.findOne(+id);
  }

}
