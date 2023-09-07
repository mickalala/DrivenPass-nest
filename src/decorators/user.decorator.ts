import { NotFoundException, createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";


export const User = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!request.user) throw new NotFoundException("User not found");
        return request.user;
    }
)