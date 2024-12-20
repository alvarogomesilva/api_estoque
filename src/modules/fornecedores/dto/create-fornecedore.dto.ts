import { IsNotEmpty } from "class-validator";

export class CreateFornecedoreDto {
    @IsNotEmpty({message: 'Nome não pode ser vazio'})
    nome: string;

    telefone?: string;
    
    email?: string;
    
    endereco?: string;
    
    @IsNotEmpty({message: 'CNPJ não pode ser vazio'})
    cnpj: string;
}
