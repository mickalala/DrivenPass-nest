import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateSignUp {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword({
        minLength: 10,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    @IsNotEmpty()
    password: string;
}