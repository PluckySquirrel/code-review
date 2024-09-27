import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Book } from "./book.entity";
import { MAX_LENGTH, BookInstanceStatus } from "../constants";

@Entity()
export class BookInstance {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: MAX_LENGTH, nullable: false})
    imprint: string

    @Column({ type: 'enum', enum: BookInstanceStatus, default: BookInstanceStatus.Maintenance})
    status!: BookInstanceStatus

    @Column()
    due_back: Date

    @ManyToOne(() => Book, (book) => book.bookinstances)
    @JoinColumn({ name: 'book_id' })
    book!: Book

    url!: string
    get getUrl(): string {
        return this.url = `bookinstances/${this.id}`;
    }

    constructor(bookInstanceData?: Partial<BookInstance>) {
        this.imprint = bookInstanceData?.imprint ?? '';
        this.status = bookInstanceData?.status ?? BookInstanceStatus.Maintenance;;
        this.due_back = bookInstanceData?.due_back ?? new Date();
        this.book = bookInstanceData?.book ?? new Book({title: 'Untitled'});
    }
}


