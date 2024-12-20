import { IsNotEmpty } from "class-validator";

export class CreateClienteDto {
    @IsNotEmpty({message: 'Nome não pode ser vazio'})
    nome: string;

    @IsNotEmpty({message: 'Email não pode ser vazio'})
    email: string;

    telefone?: string;

    endereco?: string;
}
