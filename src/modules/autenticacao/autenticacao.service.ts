import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUsuarioDto } from './dto/auth-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {  }

  async signIn(signInDto: AuthUsuarioDto) {
    let passwordMatch = false
    const usuario = await this.usuarioRepository.findOne({ where: { email: signInDto.email } })

    if (usuario) {
      passwordMatch = await this.hashingService.compare(signInDto.senha, usuario.senha)
    }

    if (!usuario || !passwordMatch) {
      throw new UnauthorizedException('Email/senha incorretos!')
    }

    const acesso_token = await this.jwtService.signAsync(
      {
        sub: usuario.id_usuario,
        email: usuario.email
      },{
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl
      }
    )

    return { acesso_token }
  }

  
}
