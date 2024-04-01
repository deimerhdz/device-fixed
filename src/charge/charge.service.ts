import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { Like, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/dtos/pagination.query.dto';

@Injectable()
export class ChargeService {

  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository:Repository<Charge>
  ){

  }
  async create(createChargeDto: CreateChargeDto) {
    return await this.chargeRepository.save(createChargeDto);
  }

  async findAll({limit,offset}:PaginationQueryDto) {
    return await this.chargeRepository.find({skip:offset,take:limit,order: {id: "DESC"}});
  }

  async findOne(id: number) {
    const charge = await this.chargeRepository.findOneBy({id});
    if(!charge){
      throw new NotFoundException('charge not found')
    }
    return charge;
  }

  async findByName(name:string){
    const charges = await this.chargeRepository.findBy({
      name:Like(`%${name}%`)
    })
    return charges;
   }
  async update(id: number, updateChargeDto: UpdateChargeDto) {
    return await this.chargeRepository.update(id,updateChargeDto);
  }

  async remove(id: number) {
    return await this.chargeRepository.softDelete(id);
  }
}
