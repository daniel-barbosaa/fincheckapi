import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
    });
    if (process.env.NODE_ENV !== 'production') {
        await app.listen(process.env.PORT ?? 3001);
    } else {
        await app.init();
    }
}
bootstrap();
