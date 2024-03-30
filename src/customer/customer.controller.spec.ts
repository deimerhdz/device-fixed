import { Test, TestingModule } from "@nestjs/testing"
import { CustomerService } from "./customer.service"
import { CustomerController } from "./customer.controller"
describe('CustomeController',()=>{
    let controller :CustomerController;
    let customers =[
        {
            id:1,
            name:'test1',
            lastName:'test1',
            email:'test1@email.com',
            phoneNumber:'134324',
            address:'test1 test1'
        },
        {
            id:2,
            name:'test2',
            lastName:'test2',
            email:'test2@email.com',
            phoneNumber:'134324',
            address:'test2 test2'
        }
    ]
    const mockCustomerService = {
        create:jest.fn(dto=>{
            return {
                id:Date.now(),
                ...dto
            }
        }),
        update:jest.fn().mockImplementation((id,dto)=>({
            id,
            ...dto
        })),
        findAll:jest.fn().mockImplementation((params)=>(customers)),
        findOne:jest.fn().mockImplementation((id)=>({
            id,
            name:'test2',
            lastName:'test2',
            email:'test2@email.com',
            phoneNumber:'134324',
            address:'test2 test2'
        }))
    }
    beforeEach(async()=>{
        const module:TestingModule = await Test.createTestingModule({
            controllers:[CustomerController],
            providers:[CustomerService]
        })
        .overrideProvider(CustomerService)
        .useValue(mockCustomerService)
        .compile();
        controller = module.get<CustomerController>(CustomerController)
    
    })
    it('should be defined',()=>{
        expect(controller).toBeDefined();
    })

    it('should create a customer',()=>{
        const dto ={name:'test',lastname:'test'}
        expect(controller.create(dto)).toEqual({
            id:expect.any(Number),
            name:dto.name,
            lastname: dto.lastname
        })
        expect(mockCustomerService.create).toHaveBeenCalledWith(dto);
    })

    it('should update a customer',()=>{
        const dto ={name:'test update',lastname:'test'}
        expect(controller.update(1,dto)).toEqual({
            id:1,
           ...dto
        })
        expect(mockCustomerService.update).toHaveBeenCalled();
    })
    it('should find all a customer',()=>{
        const dto ={name:'test update',lastname:'test'}
        expect(controller.findAll({limit:2,offset:0})).toEqual(customers)
        expect(mockCustomerService.findAll).toHaveBeenCalled();
    })
    it('should findone a customer',()=>{
        const dto ={name:'test update',lastname:'test'}
        expect(controller.findOne(1)).toEqual({
            id:1,
            name:'test2',
            lastName:'test2',
            email:'test2@email.com',
            phoneNumber:'134324',
            address:'test2 test2'
        })
        expect(mockCustomerService.findAll).toHaveBeenCalled();
    })
})