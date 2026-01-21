import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Fincheck - Sistema de controle financeiro 360°')
        .setDescription(
            'Esta documentação lista as rotas disponíveis da aplicação, bem como seus respectivos requisitos e dados retornados',
        )
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}
