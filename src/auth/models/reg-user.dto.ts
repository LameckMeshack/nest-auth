import { IsEmail, IsNumber, IsString, isNumber } from "class-validator";

export class RegUserDto {
    @IsNumber()
    id?: number;
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
