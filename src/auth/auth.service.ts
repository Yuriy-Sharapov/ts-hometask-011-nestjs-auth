import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/users/interfaces/jwt.payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any>{

        const user = await this.userService.findOne(email)
        if ( user && user.password === password ){
            const { password, ...result } = user
            return result
        }
        return null
    }

    async validateUserJwt(userId: number): Promise<any>{

        const user = await this.userService.findOneById(userId)
        if ( user )
            return user
        
        return null
    }

    createToken(payload: IJwtPayload) {
        return this.jwtService.sign(payload)  // подписываем с помощью jwt сервиса
    }
}