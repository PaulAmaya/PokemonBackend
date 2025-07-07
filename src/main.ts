import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fileUpload from 'express-fileupload';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configurar express-fileupload
  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: './uploads/temp/'
  }));

  // Servir archivos estáticos desde la carpeta uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe());
  
  // Habilitar CORS si es necesario
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Servidor corriendo en puerto 3000');
  console.log('📁 Carpetas de uploads:');
  console.log('   - ./uploads/pokemon/');
  console.log('   - ./uploads/movimientos/');
  console.log('   - ./uploads/items/');
  console.log('🌐 Archivos accesibles en:');
  console.log('   - http://localhost:3000/uploads/pokemon/');
  console.log('   - http://localhost:3000/uploads/movimientos/');
  console.log('   - http://localhost:3000/uploads/items/');
}
bootstrap();
