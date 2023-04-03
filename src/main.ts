import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * It creates a microservice that connects to a RabbitMQ queue.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gestion API')
    .setDescription('Gestion de siguimiento de tareas y proyectos')
    .setVersion('1.0')
    .addTag('Gestion')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.startAllMicroservices();
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()} - Usuario`);
}
bootstrap();
