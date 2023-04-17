import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reset } from './models/reset.entity';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [TypeOrmModule.forFeature([Reset]),
    MailerModule.forRoot({
        transport: {
            host: 'localhost',
            port: 1025,
        },
        defaults: {
            from: 'no-reply@localhost.com',
        },
    })],
    controllers: [ResetController],
    providers: [ResetService]
})
export class ResetModule { }
