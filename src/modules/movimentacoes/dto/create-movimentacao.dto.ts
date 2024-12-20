import { IsNotEmpty } from "class-validator";
import { Tipo } from "../types";
import { DeepPartial, FindOperator } from "typeorm";
import { Movimentacao } from "../entities/movimentacoe.entity";

export class CreateMovimentacoeDto {
    @IsNotEmpty({message: 'Tipo de movimentacao não pode ser vazio'})
    tipo: string;

    @IsNotEmpty({message: 'Descicao não pode ser vazio'})
    descricao: string;

    @IsNotEmpty({message: 'Quantidade não pode ser vazio'})
    quantidade: number;

    @IsNotEmpty({message: 'Produto invalido'})
    id_produto: FindOperator<string>;

    id_fornecedor: number;
}
