import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserDto } from './dto/reg-user.dto';
import * as bcrypt from 'bcryptjs';



@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() user: RegUserDto) {
        // check if password are similar
        if (user.password !== user.password_confirm) {
            throw new BadRequestException('Passwords do not match');
        }
        // Hash the user's password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        // Replace the user's password with the hashed password
        user.password = hashedPassword;
        return this.authService.create(user);

    }
}

