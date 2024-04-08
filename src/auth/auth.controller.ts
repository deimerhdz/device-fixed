import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){

    }
    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get('check-token')
    checkToken(@Request() req:Request){
        const user = req['user'] as User;
        return this.authService.checkToken(user);
    }
}
