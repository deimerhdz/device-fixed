import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import {  Like, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository:Repository<Customer>
  ){ }
  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll({limit,offset}:PaginationQueryDto) {
    return this.customerRepository.find({skip:offset,take:limit,order: {id: "DESC"}});
  }

  async findOne(id: number) {
  const customer = await this.customerRepository.findOneBy({id});
  if(!customer){
      throw new NotFoundException('customer not found')
    }
    return customer;
 }

 async findByName(name:string){
  const customers = await this.customerRepository.findBy({
    name:Like(`%${name}%`)
  })

  return customers;
 }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(id,updateCustomerDto);
  }

  async remove(id: number) {
    return await this.customerRepository.softDelete({id});
  }
}
