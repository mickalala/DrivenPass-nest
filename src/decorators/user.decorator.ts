import { UnauthorizedException, createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { Response } from "express";

export const User = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const response = context.switchToHttp().getResponse<Response>();
        if (!response.locals.user) throw new UnauthorizedException();
        return response.locals.user;
    }
)