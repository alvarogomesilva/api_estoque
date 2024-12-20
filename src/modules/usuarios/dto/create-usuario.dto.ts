import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { RotaPoliticas } from "src/modules/autenticacao/enums/rota.enum";

export class CreateUsuarioDto {

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    nome: string;

    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsEmail(undefined, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({message: 'Telefone não pode ser vazio'})
    telefone: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    senha: string;

    @IsEnum(RotaPoliticas, { each: true })
    permissoes: RotaPoliticas[]
}
