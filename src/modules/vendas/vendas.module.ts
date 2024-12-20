import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { ItemVenda } from './entities/itens_venda.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Venda, ItemVenda])],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
