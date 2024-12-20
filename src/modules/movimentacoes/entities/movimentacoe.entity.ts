import { Fornecedor } from "src/modules/fornecedores/entities/fornecedore.entity";
import { Produto } from "src/modules/produtos/entities/produto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('movimentacoes')
export class Movimentacao {

    @PrimaryGeneratedColumn('uuid')
    id_movimentacao: string;

    @Column()
    tipo: string;

    @Column()
    descricao: string;

    @Column()
    quantidade: number;

    @ManyToOne(() => Produto, (produto) => produto.id_produto)
    @JoinColumn({ name: 'id_produto' })
    id_produto: Produto;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.id_fornecedor, { nullable: true })
    @JoinColumn({ name: 'id_fornecedor' })
    id_fornecedor: Fornecedor;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_movimentacao: Date;
}
