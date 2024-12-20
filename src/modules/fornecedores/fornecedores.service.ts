import { Injectable } from '@nestjs/common';
import { CreateFornecedoreDto } from './dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from './dto/update-fornecedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fornecedor } from './entities/fornecedore.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class FornecedoresService {

  constructor(
    @InjectRepository(Fornecedor) private readonly fornecedorService: Repository<Fornecedor>
  ) { }

  async create(createFornecedoreDto: CreateFornecedoreDto) {
    const { nome, telefone, email, endereco, cnpj } = createFornecedoreDto
    const fornecedor = this.fornecedorService.create({ nome, telefone, email, endereco, cnpj })
    const fornecedorCriado = await this.fornecedorService.save(fornecedor)

    const dataCricacaoFormatada = format(fornecedorCriado.data_cadastro, 'dd/MM/yyyy HH:mm')
    const dataAtualizacaoFormatada = format(fornecedorCriado.data_atualizacao, 'dd/MM/yyyy HH:mm')

    return {
      id_fornecedor: fornecedorCriado.id_fornecedor,
      nome: fornecedorCriado.nome,
      telefone: fornecedorCriado.telefone,
      email: fornecedorCriado.email,
      endereco: fornecedorCriado.endereco,
      cnpj: fornecedorCriado.cnpj,
      data_criacao: dataCricacaoFormatada,
      data_atualizacao: dataAtualizacaoFormatada
    }
  }

  findAll() {
    return `This action returns all fornecedores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fornecedore`;
  }


  async update(id: number, updateFornecedoreDto: UpdateFornecedoreDto) {
    // return this.prisma.fornecedor.update({
    //   where: { id_fornecedor: id },
    //   data: updateFornecedoreDto
    // });
  }

  remove(id: number) {
    return `This action removes a #${id} fornecedore`;
  }
}
