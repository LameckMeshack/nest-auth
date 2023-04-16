import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';



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

    //login
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        {
            const user = await this.authService.findOneBy({ email: loginDto.email });

            if (!user) {
                throw new BadRequestException('Email not found');
            }

            if (!await bcrypt.compare(loginDto.password, user.password)) {
                throw new BadRequestException('Invalid credentials');
            }
            return user;
        }
    }
}

