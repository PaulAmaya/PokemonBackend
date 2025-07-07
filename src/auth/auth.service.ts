import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginUsuarioDto } from '../usuario/dto/login-usuario.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const usuario = await this.usuarioService.login(loginUsuarioDto);
    
    const payload = { 
      sub: usuario.id, 
      username: usuario.username,
      es_admin: usuario.es_admin 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        es_admin: usuario.es_admin
      }
    };
  }

  async validateUser(userId: number): Promise<Usuario | null> {
    return this.usuarioService.findOne(userId);
  }
}
