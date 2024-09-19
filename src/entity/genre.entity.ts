import { MAX_LENGTH } from "../constants";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    name: string 

    url!: string;
<<<<<<< HEAD
    get getUrl(): string {
        return `BookInstance/${this.id}`;
    }

    constructor(genreData?: Partial<Genre>){
        this.name = genreData?.name ?? '';
=======

    constructor(genreData?: Partial<Genre>){
        this.name = genreData?.name ?? '';
        this.setUrl();
    }

    @BeforeInsert()
    @BeforeUpdate()
    setUrl() {
        // Set URL based on the author keyword and ID
        this.url = `BookInstance/${this.id}`;
>>>>>>> 158e2b0 (Part 2: Using database)
    }
}
