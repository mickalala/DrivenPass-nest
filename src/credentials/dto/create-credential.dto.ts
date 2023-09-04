import { IsNotEmpty } from "class-validator";

export class CreateCredentialDto {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    title: string;
}
