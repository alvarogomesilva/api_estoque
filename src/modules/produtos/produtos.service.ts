import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';


@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto) private readonly produtoService: Repository<Produto>
  ) { }

  async create(createProdutoDto: CreateProdutoDto) {
   const { nome, id_categoria, preco_unitario, quantidade, unidade_medida, descricao } = createProdutoDto
      const produto = this.produtoService.create({ nome, descricao, quantidade, unidade_medida, id_categoria, preco_unitario })
       const produtoCriado = await this.produtoService.save(produto)
   
       const dataCricacaoFormatada = format(produtoCriado.data_cadastro, 'dd/MM/yyyy HH:mm')
       const dataAtualizacaoFormatada = format(produtoCriado.data_atualizacao, 'dd/MM/yyyy HH:mm')
   
       return {
         id_produto: produtoCriado.id_produto,
         nome: produtoCriado.nome,
         descricao: produtoCriado.descricao,
         quantidade: produtoCriado.quantidade,
         preco_unitario: produtoCriado.preco_unitario,
         unidade_medida: produtoCriado.unidade_medida,
         id_categoria: produtoCriado.id_categoria,
         data_criacao: dataCricacaoFormatada,
         data_atualizacao: dataAtualizacaoFormatada
       }
  }

  findAll() {
    return `This action returns all produtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
