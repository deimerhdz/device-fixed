import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Charge {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar",nullable:false,length:150})
    name:string;

    @Column({type:"varchar",nullable:false,length:255})
    description:string;

    @Column({type:"decimal",nullable:false,precision: 10, scale: 2 })
    price:number;

    @DeleteDateColumn()
    deletedAt:Date;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date
}
