import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { repl } from "@nestjs/core"
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
  }))


  const configSwagger = new DocumentBuilder()
  .setTitle("Api REST de la SPA")
  .setDescription("Permet de gérer une spa avec des dauphins")
  .setVersion("0.0.1")
  .addBearerAuth({
    type : "http",
    name : "Bearer",
    bearerFormat : "Bearer",
    in : "Header",
    scheme : "Bearer"
  }, "access_token"
  )
  .build()

  const pageSwagger = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup("api", app, pageSwagger)
  

  await app.listen(5000);

}
bootstrap();
