import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService){

    }
    async login({username,password}:LoginDto){
        const user = await this.userService.findOneByUsername(username);
        if(!user){
            throw new UnauthorizedException('Usuario o contraseña incorrectos.');
        }
        const isPasswordValid = await bcryptjs.compare(password,(await user).password)
        if(!isPasswordValid){
            throw new UnauthorizedException('Usuario o contraseña incorrectos.');
        }
        const payload = {id:user.id}
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            user
        };
    }
    async checkToken({id}:User){
        const payload = {id};
        const user = await this.userService.findOne(id);
        const token = await this.jwtService.signAsync(payload);
        return {
            user,
            token
        }
    }
}
