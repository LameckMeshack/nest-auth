import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}