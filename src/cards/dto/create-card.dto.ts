import { IsBoolean, IsNotEmpty } from "class-validator";


export class CreateCardDto {
    @IsNotEmpty()
    cardNumber: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    securityCode: string;

    @IsNotEmpty()
    expiry: number;

    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isVirtual: boolean;

    @IsNotEmpty()
    type: string;

    title: string;

}
