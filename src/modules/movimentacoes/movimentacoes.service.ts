import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacoe.entity';
import { Repository } from 'typeorm';
import { Produto } from '../produtos/entities/produto.entity';

@Injectable()
export class MovimentacoesService {
  constructor(
    @InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Movimentacao) private readonly movimentoRepository: Repository<Movimentacao>
  ) { }

  async create(createMovimentacoeDto: CreateMovimentacoeDto) {

    const { id_produto, tipo, descricao, id_fornecedor, quantidade: quantidadeMovimentada } = createMovimentacoeDto;
    const produto = await this.produtoRepository.findOne({ where: { id_produto } })

    if (!produto) {
      throw new Error('Produto não encontrado')
    }

    let tipoDescricao = tipo === 'E' ? 'Compra' : 'Venda';
    let novaQuantidade: number;

    if (tipo === 'E') {
      novaQuantidade = produto.quantidade + quantidadeMovimentada; // Compra
    } else {
      if (produto.quantidade < quantidadeMovimentada) {
        throw new Error('Quantidade insuficiente para venda');
      }
      novaQuantidade = produto.quantidade - quantidadeMovimentada; // Venda
    }

    await this.produtoRepository.update(+id_produto, { quantidade: novaQuantidade })

    const movimentacao = this.movimentoRepository.create({ tipo, descricao, quantidade: quantidadeMovimentada, id_produto, id_fornecedor  })

   
  }


  findAll() {
    return `This action returns all movimentacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimentacoe`;
  }

  update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return `This action updates a #${id} movimentacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimentacoe`;
  }
}
