import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @Transform(({value})=>value.trim())
    @IsString()
    name:string;

    @IsString()
    username:string;
    
    @Transform(({value})=>value.trim())
    @IsString()
    password:string;
  
    @IsString()
    role:string
}
