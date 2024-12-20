import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
import { HashingService } from '../autenticacao/hashing/hashing.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private readonly hashingService: HashingService
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { nome, email, telefone, senha, permissoes } = createUsuarioDto
      const passwordHash = await this.hashingService.hash(senha)
      const usuario = this.usuarioRepository.create({ nome, email, telefone, senha: passwordHash, permissoes })
      const usuarioCriado = await this.usuarioRepository.save(usuario)

      const dataCricacaoFormatada = format(usuarioCriado.data_cadastro, 'dd/MM/yyyy HH:mm')
      const dataAtualizacaoFormatada = format(usuarioCriado.data_atualizacao, 'dd/MM/yyyy HH:mm')

      return {
        id_usuario: usuarioCriado.id_usuario,
        nome: usuarioCriado.nome,
        email: usuarioCriado.email,
        telefone: usuarioCriado.telefone,
        data_cadastro: dataCricacaoFormatada,
        data_atualizacao: dataAtualizacaoFormatada,
        permissoes: usuarioCriado.permissoes
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já cadastrado!')
      }

      throw error
    }


  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find();

    return usuarios.map((usuario) => ({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      data_criacao: format(usuario.data_cadastro, 'dd/MM/yyyy HH:mm'),
      data_atualizacao: format(usuario.data_atualizacao, 'dd/MM/yyyy HH:mm')
    }))
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { nome, email, telefone } = updateUsuarioDto
    const usuarioPartial = {
      nome: nome,
      email: email,
      telefone: telefone
    }

    const usuario = await this.usuarioRepository.preload({ id_usuario: id, ...usuarioPartial })

    if (!usuario) throw new NotFoundException('Usuário não encontrado!')

    const usuarioAtualizado = await this.usuarioRepository.save(usuario)

    const dataCricacaoFormatada = format(usuarioAtualizado.data_cadastro, 'dd/MM/yyyy HH:mm')
    const dataAtualizacaoFormatada = format(usuarioAtualizado.data_atualizacao, 'dd/MM/yyyy HH:mm')

    return {
      id_usuario: usuarioAtualizado.id_usuario,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
      telefone: usuarioAtualizado.telefone,
      data_cadastro: dataCricacaoFormatada,
      data_atualizacao: dataAtualizacaoFormatada
    }
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
