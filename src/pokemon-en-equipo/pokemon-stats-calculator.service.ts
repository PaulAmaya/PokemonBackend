import { Injectable } from '@nestjs/common';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { EV } from '../ev/entities/ev.entity';
import { IV } from '../iv/entities/iv.entity';
import { Naturaleza } from '../naturaleza/entities/naturaleza.entity';

export interface FinalStats {
  hp: number;
  ataque: number;
  defensa: number;
  sp_ataque: number;
  sp_defensa: number;
  velocidad: number;
}

export interface NatureMultipliers {
  ataque: number;
  defensa: number;
  sp_ataque: number;
  sp_defensa: number;
  velocidad: number;
}

@Injectable()
export class PokemonStatsCalculatorService {
  
  /**
   * Calcula HP usando la fórmula oficial de Pokémon
   * HP = floor(((2 * base + iv + floor(ev/4)) * level) / 100) + level + 10
   */
  calculateHP(base: number, iv: number, ev: number, level: number = 100): number {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  }

  /**
   * Calcula stat usando la fórmula oficial de Pokémon
   * Stat = floor((floor(((2 * base + iv + floor(ev/4)) * level) / 100) + 5) * nature)
   */
  calculateStat(base: number, iv: number, ev: number, natureMultiplier: number, level: number = 100): number {
    const baseStat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    return Math.floor(baseStat * natureMultiplier);
  }

  /**
   * Obtiene los multiplicadores de naturaleza
   */
  getNatureMultipliers(naturaleza?: Naturaleza): NatureMultipliers {
    const base = {
      ataque: 1.0,
      defensa: 1.0,
      sp_ataque: 1.0,
      sp_defensa: 1.0,
      velocidad: 1.0,
    };

    if (!naturaleza || naturaleza.stat_beneficiado === 'ninguno') {
      return base;
    }

    // Aumenta el stat beneficiado en 10%
    if (naturaleza.stat_beneficiado in base) {
      base[naturaleza.stat_beneficiado as keyof NatureMultipliers] = 1.1;
    }

    // Disminuye el stat perjudicado en 10%
    if (naturaleza.stat_perjudicado in base) {
      base[naturaleza.stat_perjudicado as keyof NatureMultipliers] = 0.9;
    }

    return base;
  }

  /**
   * Calcula todos los stats finales al nivel 100
   */
  calculateAllStats(pokemon: Pokemon, evs: EV, ivs: IV, naturaleza?: Naturaleza): FinalStats {
    const natureMultipliers = this.getNatureMultipliers(naturaleza);
    
    return {
      hp: this.calculateHP(pokemon.base_hp, ivs.hp, evs.hp),
      ataque: this.calculateStat(pokemon.base_ataque, ivs.ataque, evs.ataque, natureMultipliers.ataque),
      defensa: this.calculateStat(pokemon.base_defensa, ivs.defensa, evs.defensa, natureMultipliers.defensa),
      sp_ataque: this.calculateStat(pokemon.base_sp_ataque, ivs.sp_ataque, evs.sp_ataque, natureMultipliers.sp_ataque),
      sp_defensa: this.calculateStat(pokemon.base_sp_defensa, ivs.sp_defensa, evs.sp_defensa, natureMultipliers.sp_defensa),
      velocidad: this.calculateStat(pokemon.base_velocidad, ivs.velocidad, evs.velocidad, natureMultipliers.velocidad),
    };
  }
}
