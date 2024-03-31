import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    name:string;

    @IsString()
    lastname:string;

    @IsString()
    email?:string;

    @IsString()
    phoneNumber?:string;
    
    @IsString()
    address?:string;

    @IsOptional()
    @IsNumber()
    id?:number;
}
