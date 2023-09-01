import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSignUp } from './dto/create-signUp.dto';
import { CreateSignIn } from './dto/create-signIn.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() body: CreateSignUp) {
        return this.authService.createUser(body);
    };

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    SignIn(@Body() body: CreateSignIn) {
        return this.authService.signInUser(body);
    }
}
