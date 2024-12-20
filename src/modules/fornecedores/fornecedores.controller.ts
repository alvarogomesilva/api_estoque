import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedoreDto } from './dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from './dto/update-fornecedore.dto';
import { AutenticacaoGuard } from '../autenticacao/guards/autenticacao.guard';


@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @UseGuards(AutenticacaoGuard)
  @Post()
  create(@Body() createFornecedoreDto: CreateFornecedoreDto) {
    return this.fornecedoresService.create(createFornecedoreDto);
  }

  @Get()
  findAll() {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fornecedoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFornecedoreDto: UpdateFornecedoreDto) {
    return this.fornecedoresService.update(+id, updateFornecedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fornecedoresService.remove(+id);
  }
}
