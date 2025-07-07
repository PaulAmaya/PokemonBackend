import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Usuario> {
    const nuevoAdmin = this.usuarioRepository.create({
      ...createAdminDto,
      es_admin: true
    });
    return this.usuarioRepository.save(nuevoAdmin);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    // Verificar que el usuario existe
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    // Eliminar el usuario
    await this.usuarioRepository.delete(id);
    
    return { 
      message: `Usuario '${usuario.username}' eliminado exitosamente` 
    };
  }

  async login(loginUsuarioDto: LoginUsuarioDto): Promise<Usuario> {
    const { username, password } = loginUsuarioDto;
    
    const usuario = await this.usuarioRepository.findOne({
      where: { username }
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (usuario.password !== password) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return usuario;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { username }
    });
  }

  async findAdmins(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { es_admin: true }
    });
  }

  async findNormalUsers(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { es_admin: false }
    });
  }

  async toggleAdminStatus(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.es_admin = !usuario.es_admin;
    return this.usuarioRepository.save(usuario);
  }

  async changePassword(id: number, newPassword: string): Promise<{ message: string }> {
    // Verificar que el usuario existe
    const usuario = await this.findOne(id);
    
    // Actualizar la contraseña
    usuario.password = newPassword;
    await this.usuarioRepository.save(usuario);
    
    return {
      message: `Contraseña del usuario '${usuario.username}' actualizada exitosamente`
    };
  }

  async changeOwnPassword(userId: number, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    // Verificar que el usuario existe
    const usuario = await this.findOne(userId);
    
    // Verificar la contraseña actual
    if (usuario.password !== currentPassword) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }
    
    // Actualizar la contraseña
    usuario.password = newPassword;
    await this.usuarioRepository.save(usuario);
    
    return {
      message: 'Tu contraseña ha sido actualizada exitosamente'
    };
  }
}
