import { RotaPoliticas } from "src/modules/autenticacao/enums/rota.enum";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    telefone: string;

    @Column()
    senha: string;

    @Column({ type: 'simple-array', default: [] })
    permissoes: RotaPoliticas[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    data_atualizacao: Date;
}
