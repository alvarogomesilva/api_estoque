import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/modules/categorias/entities/categoria.entity";
import { DeepPartial } from "typeorm";

export class CreateProdutoDto {
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    nome: string;

    descricao?: string;

    @IsNotEmpty({ message: 'Preço unitário não pode ser vazio' })
    preco_unitario: number;

    quantidade: number;

    @IsNotEmpty({ message: 'Unidade de medida não pode ser vazio' })
    unidade_medida: string;

    @IsNotEmpty({ message: 'Tipo categoria não pode ser vazio' })
    id_categoria: DeepPartial<Categoria>;
}
