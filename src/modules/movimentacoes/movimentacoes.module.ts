import { Module } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { MovimentacoesController } from './movimentacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacoe.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService],
})
export class MovimentacoesModule {}
