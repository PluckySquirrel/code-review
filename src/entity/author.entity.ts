import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, JoinTable } from "typeorm";
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

<<<<<<< HEAD
    get fullName(): string {
        return `${this.firstName} ${this.familyName}`;
    }

    get getUrl(): string {
        return `Author/${this.id}`;
    }
=======
    name!: string

    url!: string
>>>>>>> 158e2b0 (Part 2: Using database)
    
    constructor(authorData?: Partial<Author>) {
        this.firstName = authorData?.firstName ?? '';
        this.familyName = authorData?.familyName ?? '';
        this.dateOfBirth = authorData?.dateOfBirth ?? new Date();
        this.dateOfDeath = authorData?.dateOfDeath ?? new Date();
<<<<<<< HEAD
=======
        this.setName();
        this.setUrl();
    }

    @BeforeInsert()
    @BeforeUpdate()
    setName() {
        this.name = `${this.firstName} ${this.familyName}`;
    }

    @BeforeInsert()
    @BeforeUpdate()
    setUrl() {
        // Set URL based on the author keyword and ID
        this.url = `Author/${this.id}`;
>>>>>>> 158e2b0 (Part 2: Using database)
    }
}
