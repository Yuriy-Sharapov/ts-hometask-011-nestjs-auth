import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { IUserDto } from './interfaces/user.dto';
import { IJwtPayload } from './interfaces/jwt.payload';
import { ISignupUserDto } from './interfaces/signup.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('/api/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService) {}

    @Get('/token/:userId')
    async getToken(@Param() userId: number): Promise<string> {
    
        console.log(`===async getToken - userId===`)
        console.log(userId)
    
        let user: IUserDto
        try {
        user = await this.usersService.findOneById(userId)
        }
        catch(e){
        console.log(e)
        return
        }
        
        console.log(`===async getToken - dbuser===`)
        console.log(user)
    
        const jwtPayload: IJwtPayload = {
        id       : user.id.toString(),        // id пользователя
        email    : user.email,                // email пользователя
        firstName: user.firstName             // firstName пользователя      
        }
        return this.authService.createToken(jwtPayload)
    }
    
    // Регистрация пользователя
    @Post('/signup')
    async signup(@Body() body: ISignupUserDto): Promise<IUserDto> {
        return this.usersService.create(body)
    }
    
    // Аутентификация пользвоателя
    @UseGuards(JwtAuthGuard)
    @Post('/signin')
    async signin(@Request() req: any) {
        return req.user
    }
}
