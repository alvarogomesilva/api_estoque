import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedoreDto } from './create-fornecedore.dto';

export class UpdateFornecedoreDto extends PartialType(CreateFornecedoreDto) {
    nome?: string;
    email?: string;
    telefone?: string;
    cnpj?: string;
    endereco?: string;
}
