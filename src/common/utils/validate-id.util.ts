import { BadRequestException } from '@nestjs/common';

export function validateId(id: string, entityName: string = 'ID'): number {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId <= 0) {
    throw new BadRequestException(`${entityName} debe ser un número entero positivo válido`);
  }
  return numericId;
}
