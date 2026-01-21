import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/setup';
import { env } from './shared/config/env';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'sentry-trace',
            'baggage',
        ],
    });

    const port = process.env.API_PORT ?? 3333;
    const serverUrl = `${env.apiBaseUrl ?? 'http://localhost'}:${port}`;

    if (process.env.NODE_ENV !== 'production') {
        setupSwagger(app);
    }

    await app.listen(port);

    logger.log(`🚀 Server running at ${serverUrl}`);
    if (process.env.NODE_ENV !== 'production') {
        logger.log(`📘 Swagger running at ${serverUrl}/swagger`);
    }
}

void bootstrap();
