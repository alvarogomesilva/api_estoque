import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não logado!');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      const usuario = await this.usuarioRepository.findOneBy({
        id_usuario: payload.sub,

      });

      if (!usuario) {
        throw new UnauthorizedException('Usuario não autorizado');
      }

      payload['usuario'] = usuario;
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;

    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}