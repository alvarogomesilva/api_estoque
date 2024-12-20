import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AutenticacaoController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AutenticacaoService,
  ],
  exports: [HashingService, JwtModule, ConfigModule, TypeOrmModule],
})
export class AutenticacaoModule {}