import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate, JoinColumn } from "typeorm";
import { BookInstance } from "./bookinstance.entity";
import { Author } from "./author.entity";
import { Genre } from "./genre.entity";
import { MAX_LENGTH } from "../constants";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    title!: string

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    summary: string

    @Column()
    isbn: string

    @OneToMany(() => BookInstance, (bookinstance) => bookinstance.book)
    bookinstances!: BookInstance[] | undefined

    @ManyToOne(() => Author, (author) => author.books)
    @JoinColumn({ name: 'author_id' })
    author!: Author | undefined

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[] | undefined

    url!: string
<<<<<<< HEAD
    get getUrl(): string {
        return `Book/${this.id}`;
    }
=======
>>>>>>> 158e2b0 (Part 2: Using database)

    constructor(bookData?: Partial<Book>){
        this.title = bookData?.title ?? '';
        this.summary = bookData?.summary ?? '';
        this.isbn = bookData?.isbn ?? '';
        this.author = bookData?.author ?? undefined;
<<<<<<< HEAD
=======
        this.setUrl();
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    setUrl() {
        // Set URL based on the author keyword and ID
        this.url = `Book/${this.id}`;
>>>>>>> 158e2b0 (Part 2: Using database)
    }
}
