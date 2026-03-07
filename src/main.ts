import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.port || 5000;
  const app = await NestFactory.create(AppModule);
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
