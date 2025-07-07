import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { EquipoModule } from './equipo/equipo.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonHabilidadModule } from './pokemon-habilidad/pokemon-habilidad.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { PokemonMovimientoModule } from './pokemon-movimiento/pokemon-movimiento.module';
import { ItemModule } from './item/item.module';
import { NaturalezaModule } from './naturaleza/naturaleza.module';
import { PokemonEnEquipoModule } from './pokemon-en-equipo/pokemon-en-equipo.module';
import { EvModule } from './ev/ev.module';
import { IvModule } from './iv/iv.module';
import { MovimientoSeleccionadoModule } from './movimiento-seleccionado/movimiento-seleccionado.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0204',
      database: 'pokedex',
      autoLoadEntities: true,
      synchronize: true, // solo en desarrollo
    }),
    UsuarioModule,
    EquipoModule,
    PokemonModule,
    PokemonHabilidadModule,
    MovimientoModule,
    PokemonMovimientoModule,
    ItemModule,
    NaturalezaModule,
    PokemonEnEquipoModule,
    EvModule,
    IvModule,
    MovimientoSeleccionadoModule,
    AuthModule,
    // Aquí irán los módulos (users, pokemon, equipos, etc.)
  ],
})
export class AppModule {}
