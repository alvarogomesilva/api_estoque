import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './modules/usuarios/entities/usuario.entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { MovimentacoesModule } from './modules/movimentacoes/movimentacoes.module';
import { VendasModule } from './modules/vendas/vendas.module';
import { ClientesModule } from './modules/clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'masterkey',
      database: 'estoques',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AutenticacaoModule,
    UsuariosModule,
    CategoriasModule,
    ProdutosModule,
    ClientesModule,
    FornecedoresModule,
    MovimentacoesModule,
    VendasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
