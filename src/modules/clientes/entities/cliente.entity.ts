import { Venda } from "src/modules/vendas/entities/venda.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    telefone: string;

    @Column({ nullable: true })
    endereco: string;

    @OneToMany(() => Venda, (venda) => venda.id_venda)
    venda: Venda[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date;
}
