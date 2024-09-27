import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Book } from "./book.entity";
import { MAX_LENGTH } from "../constants";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    firstName!: string | undefined

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    familyName!: string

    @Column()
    dateOfBirth: Date 

    @Column()
    dateOfDeath: Date 

    @OneToMany(() => Book, (book) => book.author)
    books!: Book[]

    get getFullName(): string {
        return `${this.firstName}, ${this.familyName}`;
    }

    url!: string
    get getUrl(): string {
        return this.url = `${this.id}`;
    }
    
    constructor(authorData?: Partial<Author>) {
        this.firstName = authorData?.firstName ?? '';
        this.familyName = authorData?.familyName ?? '';
        this.dateOfBirth = authorData?.dateOfBirth ?? new Date();
        this.dateOfDeath = authorData?.dateOfDeath ?? new Date();
    }
}
