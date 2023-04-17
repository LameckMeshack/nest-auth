import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PassThrough } from 'stream';



@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
        
    }

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
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        {
            const user = await this.authService.findOneBy({ email: loginDto.email });

            if (!user) {
                throw new BadRequestException('Email not found');
            }

            if (!await bcrypt.compare(loginDto.password, user.password)) {
                throw new BadRequestException('Invalid credentials');
            }

            const jwt = await this.jwtService.signAsync({ id: user.id });
            response.cookie('jwt', jwt, { httpOnly: true });
            return user;
        }
    }
}

