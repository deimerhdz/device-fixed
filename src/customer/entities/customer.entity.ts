import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",nullable:false,length:45})
    name:string;

    @Column({type:"varchar",nullable:false,length:45})
    lastname:string;

    @Column({type:"varchar",nullable:true,length:100})
    email:string;

    @Column({type:"varchar",nullable:true,length:15})
    phoneNumber:string;

    @Column({type:"varchar",nullable:true,length:255})
    address:string;

    @DeleteDateColumn()
    deletedAt:Date;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date

}
