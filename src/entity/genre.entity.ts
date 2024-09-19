import { MAX_LENGTH } from "../constants";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    name: string 

    url!: string;
    get getUrl(): string {
        return `BookInstance/${this.id}`;
    }

    constructor(genreData?: Partial<Genre>){
        this.name = genreData?.name ?? '';
    }
}
