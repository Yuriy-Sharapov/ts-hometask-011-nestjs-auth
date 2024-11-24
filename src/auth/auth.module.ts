import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret     : process.env.JwtSecretKey,
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
