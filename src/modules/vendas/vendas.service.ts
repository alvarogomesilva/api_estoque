import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';


@Injectable()
export class VendasService {

  constructor() { }

   //async create(createVendaDto: CreateVendaDto) {
    // const { id_cliente, status, itensVenda } = createVendaDto;

    // // Verificar se o cliente existe
    // const cliente = await this.prisma.cliente.findUnique({
    //   where: { id_cliente },
    // });
    // if (!cliente) {
    //   throw new NotFoundException(`Cliente com ID ${id_cliente} não encontrado`);
    // }

    // // Calcular o total da venda
    // let total = 0;
    // for (const item of itensVenda) {
    //   const produto = await this.prisma.produto.findUnique({
    //     where: { id_produto: item.id_produto },
    //   });
    //   if (!produto) {
    //     throw new NotFoundException(`Produto com ID ${item.id_produto} não encontrado`);
    //   }
      
    //   // Verificar a quantidade disponível do produto
    //   if (produto.quantidade < item.quantidade) {
    //     throw new Error(`Quantidade insuficiente do produto ${produto.nome}`);
    //   }

    //   total += item.preco_unitario * item.quantidade;
    // }

    // // Criar a venda
    // const venda = await this.prisma.venda.create({
    //   data: {
    //     id_cliente,
    //     status,
    //     total,
    //     itensVenda: {
    //       create: itensVenda.map(item => ({
    //         id_produto: item.id_produto,
    //         quantidade: item.quantidade,
    //         preco_unitario: item.preco_unitario,
    //       })),
    //     },
    //   },
    //   include: { itensVenda: true },
    // });

    // // Atualizar o estoque dos produtos vendidos
    // for (const item of itensVenda) {
    //   await this.prisma.produto.update({
    //     where: { id_produto: item.id_produto },
    //     data: {
    //       quantidade: {
    //         decrement: item.quantidade,
    //       },
    //     },
    //   });

    //   // Registrar a movimentação de saída para cada produto
    //   await this.prisma.movimentacao.create({
    //     data: {
    //       tipo: 'S',
    //       descricao: `Venda`,
    //       quantidade: item.quantidade,
    //       id_produto: item.id_produto,
    //     },
    //   });
    // }

    // return venda;
  //}

  // Método para listar todas as vendas
  //async findAll() {
    // return this.prisma.venda.findMany({
    //   include: {
    //     itensVenda: {
    //       include: {
    //         produto: true,
    //       },
    //     },
    //     cliente: true,
    //   },
    // });
  //}

  // Método para encontrar uma venda por ID
  // async findOne(id_venda: number) {
  // //   return this.prisma.venda.findUnique({
  // //     where: { id_venda },
  // //     include: {
  // //       itensVenda: {
  // //         include: {
  // //           produto: true,
  // //         },
  // //       },
  // //       cliente: true,
  // //     },
  // //   });
  // }
}

