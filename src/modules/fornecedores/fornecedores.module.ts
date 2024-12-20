import { Module } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedor } from './entities/fornecedore.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Fornecedor])],
  controllers: [FornecedoresController],
  providers: [FornecedoresService],
})
export class FornecedoresModule {}
