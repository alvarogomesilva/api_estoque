import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVendaDto {
  @IsInt()
  @IsNotEmpty()
  id_cliente: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  itensVenda: CreateItemVendaDto[];

  @IsOptional()
  @IsDecimal()
  total?: number;
}

export class CreateItemVendaDto {
  @IsInt()
  @IsNotEmpty()
  id_produto: number;

  @IsInt()
  @IsNotEmpty()
  quantidade: number;

  @IsDecimal()
  @IsNotEmpty()
  preco_unitario: number;
}
