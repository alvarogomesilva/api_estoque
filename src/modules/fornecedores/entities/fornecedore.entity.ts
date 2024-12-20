import { Movimentacao } from "src/modules/movimentacoes/entities/movimentacoe.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('fornecedores')
export class Fornecedor {

    @PrimaryGeneratedColumn()
    id_fornecedor: number;

    @Column()
    nome: string;

    @Column({ nullable: true })
    telefone: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    endereco: string;

    @Column()
    cnpj: string;

    @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.id_movimentacao)
    movimentacao: Movimentacao[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date;
}
