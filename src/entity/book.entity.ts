import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
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

    @ManyToMany(() => Genre, (genre) => genre.books)
    @JoinTable()
    genres: Genre[] | undefined

    url!: string
    get getUrl(): string {
        return this.url = `${this.id}`;
    }

    constructor(bookData?: Partial<Book>){
        this.title = bookData?.title ?? '';
        this.summary = bookData?.summary ?? '';
        this.isbn = bookData?.isbn ?? '';
        this.author = bookData?.author ?? undefined;
    }
}
