import { Produto } from "src/modules/produtos/entities/produto.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @OneToMany(() => Produto, (produto) => produto.id_produto)
    produto: Produto[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date;
}
