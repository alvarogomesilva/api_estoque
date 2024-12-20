import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) private readonly categoriaService: Repository<Categoria>
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const { nome, descricao } = createCategoriaDto
    const categoria = this.categoriaService.create({ nome, descricao })
    const categoriaCriada = await this.categoriaService.save(categoria)

    const dataCricacaoFormatada = format(categoriaCriada.data_cadastro, 'dd/MM/yyyy HH:mm')
    const dataAtualizacaoFormatada = format(categoriaCriada.data_atualizacao, 'dd/MM/yyyy HH:mm')

    return {
      id_categoria: categoriaCriada.id_categoria,
      nome: categoriaCriada.nome,
      descricao: categoriaCriada.descricao,
      data_criacao: dataCricacaoFormatada,
      data_atualizacao: dataAtualizacaoFormatada
    }
  }

  async findAll() {
    const categorias = await this.categoriaService.find()
    return categorias.map((categoria) => ({
      id_categoria: categoria.id_categoria,
      nome: categoria.nome,
      descricao: categoria.descricao,
      data_cadastro: format(categoria.data_cadastro, 'dd/MM/yyyy'),
      data_atualizacao: format(categoria.data_atualizacao, 'dd/MM/yyyy')
    }))
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const { nome, descricao } = updateCategoriaDto
    const partialCategoria = { nome, descricao }
    const categoria = await this.categoriaService.preload(partialCategoria)
    const categoriaAtualizda = await this.categoriaService.save(categoria)

    const dataCricacaoFormatada = format(categoriaAtualizda.data_cadastro, 'dd/MM/yyyy HH:mm')
    const dataAtualizacaoFormatada = format(categoriaAtualizda.data_atualizacao, 'dd/MM/yyyy HH:mm')

    return {
      id_categoria: categoriaAtualizda.id_categoria,
      nome: categoriaAtualizda.nome,
      descricao: categoriaAtualizda.descricao,
      data_cadastro: dataCricacaoFormatada,
      data_atualizacao: dataAtualizacaoFormatada
    }

  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
