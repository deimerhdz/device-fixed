import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateChargeDto {

    @IsOptional()
    @IsNumber()
    id?:number;

    @IsString()
    name:string;

    @IsString()
    description?:string;

    @IsNumber()
    @IsPositive()
    price:number;
    
}
