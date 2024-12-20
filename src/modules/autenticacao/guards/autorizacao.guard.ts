import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_TOKEN_PAYLOAD_KEY, ROUTE_POLICY_KEY } from '../constants';
import { RotaPoliticas } from '../enums/rota.enum';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Injectable()
export class AutorizacaoGuard implements CanActivate {
  
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rotaPolitica = this.reflector.get<RotaPoliticas | undefined>(ROUTE_POLICY_KEY, context.getHandler())

    if (!rotaPolitica) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const tokenPayload = request[REQUEST_TOKEN_PAYLOAD_KEY]
    
    if (!tokenPayload) {
      throw new UnauthorizedException(
        `Rota requer permissão ${rotaPolitica}. Usuário não logado.`,
      );
    }
    const { usuario }: { usuario: Usuario } = tokenPayload;
    if (!usuario.permissoes.includes(rotaPolitica)) {
      throw new UnauthorizedException(
        `Usuário não tem permissão ${rotaPolitica}`,
      );
    }
    return true;
  }
}