import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacoeDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacao.dto';
import { AutenticacaoGuard } from '../autenticacao/guards/autenticacao.guard';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @UseGuards(AutenticacaoGuard)
  @Post()
  create(@Body() createMovimentacoeDto: CreateMovimentacoeDto) {
    return this.movimentacoesService.create(createMovimentacoeDto);
  }

  @Get()
  findAll() {
    return this.movimentacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return this.movimentacoesService.update(+id, updateMovimentacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentacoesService.remove(+id);
  }
}
