import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  
  const config = new DocumentBuilder()
    .setTitle('Gestion API')
    .setDescription('Gestion de siguimiento de tareas y projectos')
    .setVersion('1.0')
    .addTag('Gestion')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.startAllMicroservices();
  
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()} - Usuario`);
}
bootstrap();
