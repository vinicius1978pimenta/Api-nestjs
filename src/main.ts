import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:4200',  // Angular dev server
        'http://localhost:3000',  // Caso use outra porta
        'https://seu-dominio.com' // Seu domínio em produção
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true, // Se precisar de cookies/auth
    }
  });

  // Configuração global de validação
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true, // Rejeita propriedades não definidas nos DTOs
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Configuração adicional para produção
  if (process.env.NODE_ENV === 'production') {
    app.setGlobalPrefix('api'); // Adiciona prefixo /api para todas as rotas
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 API rodando em: http://localhost:${port}`);
}

bootstrap().catch(err => {
  console.error('Erro ao iniciar a aplicação:', err);
  process.exit(1);
});