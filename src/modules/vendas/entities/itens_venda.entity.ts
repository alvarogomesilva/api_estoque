import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Venda } from "./venda.entity";
import { Produto } from "src/modules/produtos/entities/produto.entity";

@Entity('itens_vendas')
export class ItemVenda {

    @PrimaryGeneratedColumn()
    id_item_venda: number;

    @Column()
    quantidade: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    preco_unitario: number;

    @ManyToOne(() => Venda, (venda) => venda.id_venda)
    @JoinColumn({ name: 'id_venda' })
    id_venda: Venda

    @ManyToOne(() => Produto, (produto) => produto.id_produto)
    @JoinColumn({ name: 'id_produto' })
    id_produto: Produto
}