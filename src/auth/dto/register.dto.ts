import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegUserDto {
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    password_confirm: string;
}
