import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // ✅ REGISTRA AQUÍ LA ENTIDAD
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // (opcional si otros módulos lo usarán)
})
export class UsuarioModule {}
