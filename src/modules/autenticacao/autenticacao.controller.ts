import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AuthUsuarioDto } from './dto/auth-usuario.dto';

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private autenticacaoService: AutenticacaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthUsuarioDto) {
    return this.autenticacaoService.signIn(signInDto);
  }
}
