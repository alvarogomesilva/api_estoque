import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AutenticacaoGuard } from '../autenticacao/guards/autenticacao.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(AutenticacaoGuard)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @UseGuards(AutenticacaoGuard)
  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @UseGuards(AutenticacaoGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
