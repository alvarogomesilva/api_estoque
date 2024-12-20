import { Cliente } from "src/modules/clientes/entities/cliente.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemVenda } from "./itens_venda.entity";

@Entity('vendas')
export class Venda {

    @PrimaryGeneratedColumn()
    id_venda: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.id_cliente)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column()
    status: string;

    @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.id_item_venda)
    itemVenda: ItemVenda[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_venda: Date;
}
