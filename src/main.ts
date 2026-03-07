import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.port || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('First Nest app')
    .setDescription('Rest api docs')
    .setVersion('1.0.0')
    .addTag('lowerKamaCase')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  app
    .listen(PORT)
    .then(() => {
      console.log('Server started at port ' + PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}

bootstrap();
