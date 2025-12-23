import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface AutheticateRequest extends Request {
    userId: string;
}

export const ActiveUserId = createParamDecorator<undefined>(
    (data, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<AutheticateRequest>();
        const userId = request.userId;

        if (!userId) {
            throw new UnauthorizedException();
        }

        return userId;
    },
);
