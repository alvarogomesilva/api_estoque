import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly clienteService: Repository<Cliente>
  ) {}

  async create(createClienteDto: CreateClienteDto) {
     const { nome, telefone, email, endereco } = createClienteDto
        const cliente = this.clienteService.create({ nome, telefone, email, endereco })
        const clienteCriado = await this.clienteService.save(cliente)
    
        const dataCricacaoFormatada = format(clienteCriado.data_cadastro, 'dd/MM/yyyy HH:mm')
        const dataAtualizacaoFormatada = format(clienteCriado.data_atualizacao, 'dd/MM/yyyy HH:mm')
    
        return {
          id_cliente: clienteCriado.id_cliente,
          nome: clienteCriado.nome,
          telefone: clienteCriado.nome,
          email: clienteCriado.email,
          endereco: clienteCriado.endereco,
          data_criacao: dataCricacaoFormatada,
          data_atualizacao: dataAtualizacaoFormatada
        }
  }

  findAll() {
    return `This action returns all clientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    // return this.prisma.cliente.update({
    //   where: { id_cliente: id },
    //   data: updateClienteDto
    // });
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
