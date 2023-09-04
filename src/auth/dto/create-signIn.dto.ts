import { IsNotEmpty } from "class-validator";

export class CreateSignIn {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}