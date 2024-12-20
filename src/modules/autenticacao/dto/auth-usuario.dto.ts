import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUsuarioDto {

    @IsNotEmpty({ message: 'Email/Senha inválidos' })
    @IsEmail(undefined, { message: 'Email/Senha inválidos' })
    email: string;

    @IsNotEmpty({ message: 'Email/Senha inválidos' })
    senha: string;
}