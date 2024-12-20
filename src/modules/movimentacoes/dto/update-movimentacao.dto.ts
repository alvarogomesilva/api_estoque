import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentacoeDto } from './create-movimentacao.dto';

export class UpdateMovimentacoeDto extends PartialType(CreateMovimentacoeDto) {}
