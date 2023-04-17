import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()

export class ResetController {
    constructor(
        private resetService: ResetService,
        private mailerService: MailerService
    ) {

    }
    @Post('forgot')
    async forgot(@Body('email') email: string) {
        const token = Math.random().toString(20).substring(2, 12)

        await this.resetService.create({
            email, token
        })

        const url = `http://localhost:3000/reset/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `<a href="${url}">Reset Password</a>`
        })

        return {
            message: 'Check your email'
        }
    }
}