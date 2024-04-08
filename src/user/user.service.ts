import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/dtos/pagination.query.dto';
import * as bcryptjs from 'bcryptjs';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){

  }
  async create({name,username,password,role}: CreateUserDto) {
    const user = this.userRepository.findOneBy({username});
    if(user){
      throw new BadRequestException('El usuario ya existe.');
    }
    return await this.userRepository.save({
      name,
      username,
      password:await bcryptjs.hash(password,10),
      role
    });
  }

  async findOneByUsername(username:string){
    return await this.userRepository.findOneBy({username})
  }

  async findAll({limit,offset}:PaginationQueryDto) {
    return await this.userRepository.find({skip:offset,take:limit,order: {id: "DESC"}});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
