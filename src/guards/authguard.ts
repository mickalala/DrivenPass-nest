import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try {
      
            const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
            const user = await this.authService.get(parseInt(data.sub));
            
            if (!user) throw new Error("Error with user");
            request.user = user
        } catch (error) {
            console.log(error)
            return false;
        }
        return true;
    }
}