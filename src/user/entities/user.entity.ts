import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar",nullable:false,length:150})
    name:string;
    @Column({type:"varchar",nullable:false,length:150,unique:true})
    username:string;
    @Column({type:"varchar",nullable:false,length:255})
    password:string;
    @Column({type:"varchar",nullable:false, default:'user',length:255})
    role:string;
    @DeleteDateColumn()
    deletedAt:Date;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date
}
