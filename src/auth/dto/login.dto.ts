
import { OmitType } from "@nestjs/swagger";
import { RegUserDto } from "./register.dto";

export class LoginDto extends OmitType(RegUserDto, ['last_name', 'first_name', 'password_confirm'] as const) { }
