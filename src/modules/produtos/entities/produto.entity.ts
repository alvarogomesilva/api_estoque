import { Categoria } from "src/modules/categorias/entities/categoria.entity";
import { Movimentacao } from "src/modules/movimentacoes/entities/movimentacoe.entity";
import { ItemVenda } from "src/modules/vendas/entities/itens_venda.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('produtos')
export class Produto {

    @PrimaryGeneratedColumn()
    id_produto: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    preco_unitario: number;
    
    @Column({ default: 0 })
    quantidade: number;
    

    @Column()
    unidade_medida: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.id_categoria)
    @JoinColumn({ name: 'id_categoria' })
    id_categoria: Categoria;

    @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.id_movimentacao)
    movimentacaoes: Movimentacao[];

    @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.id_item_venda)
    itemVenda: ItemVenda[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date;
}
