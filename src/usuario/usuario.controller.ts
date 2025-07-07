import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { validateId } from '../common/utils/validate-id.util';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.usuarioService.login(loginUsuarioDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('admin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usuarioService.createAdmin(createAdminDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admins')
  findAdmins() {
    return this.usuarioService.findAdmins();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('users')
  findNormalUsers() {
    return this.usuarioService.findNormalUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changeOwnPassword(@Request() req, @Body() changeOwnPasswordDto: ChangeOwnPasswordDto) {
    return this.usuarioService.changeOwnPassword(
      req.user.userId,
      changeOwnPasswordDto.currentPassword,
      changeOwnPasswordDto.newPassword
    );
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/change-password')
  changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = validateId(id, 'ID de usuario');
    return this.usuarioService.changePassword(userId, changePasswordDto.newPassword);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/toggle-admin')
  toggleAdminStatus(@Param('id') id: string) {
    const userId = validateId(id, 'ID de usuario');
    return this.usuarioService.toggleAdminStatus(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = validateId(id, 'ID de usuario');
    return this.usuarioService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const userId = validateId(id, 'ID de usuario');
    return this.usuarioService.update(userId, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = validateId(id, 'ID de usuario');
    return this.usuarioService.remove(userId);
  }
}
