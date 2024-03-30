import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomerService', () => {
  let customerService:CustomerService;
  let customerRepository:Repository<Customer>;
  let CUSTOMER_REPOSITORY_TOKEN =getRepositoryToken(Customer);
  let customer ={
    id:1,
    name:'tets',
    lastname:'test',
    email:'testemail@gmail.com',
    phoneNumber:'392948',
    address:'test',
    deletedAt:null,
    createdAt:new Date(),
    updatedAt:new Date()
  };
  const mockCustomerRepository ={
    create:jest.fn().mockImplementation(dto=>dto),
    save:jest.fn().mockImplementation(customer=>Promise.resolve({id:Date.now(),...customer})),
    find:jest.fn(),
    findOne:jest.fn().mockImplementation((id)=>({...customer})),
    findOneBy:jest.fn().mockImplementation((id)=>({...customer})),
    update:jest.fn().mockImplementation((id,dto)=>dto),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService,{
        provide:CUSTOMER_REPOSITORY_TOKEN,
        useValue:mockCustomerRepository
      }],
    })
    .compile();
    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<Repository<Customer>>(CUSTOMER_REPOSITORY_TOKEN)
  });

  it('should be defined',()=>{
    expect(customerService).toBeDefined()
  })

  it('customerRepository be defined',()=>{
    expect(customerRepository).toBeDefined()
  })

  describe('createCustomer',()=>{
    it('should be a new customer and return that',async ()=>{
      expect(await customerService.create(customer)).toEqual(customer)
     
    })
  })

  it('find customer by id',async()=>{
    expect(await customerService.findOne(1)).toEqual(customer)
  })

  describe('updateCustomer',()=>{
    it('should be a new customer and return that',async ()=>{
      expect(await customerService.update(1,customer)).toEqual(customer)
    })
  })
});
