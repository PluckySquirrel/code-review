import { MAX_LENGTH } from "../constants";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    name: string 

    @ManyToMany(() => Book, (book) => book.genres)
    books!: Book[];

    url!: string;
    get getUrl(): string {
        return this.url = `Genre/${this.id}`;
    }

    constructor(genreData?: Partial<Genre>){
        this.name = genreData?.name ?? '';
    }
}
