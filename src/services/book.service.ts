import { AppDataSource } from "../config/data-source";
import { Book } from "../entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const getNumBooks = async () => {
    return await Promise.all([bookRepository.count()]);
};

export const getListBooks = async () => {
    return await bookRepository.find({
        order: { title: 'ASC'},
        relations: ['author']
    })
}

export const getBookById = async (id: number) => {
    return await bookRepository.findOne({
        relations: ['author', 'genres', 'bookinstances'],
        where: { id: id }
    })
}

export const getBookByName = async (name: string) => {
    return await bookRepository.findOne({
        relations: ['author', 'genres', 'bookinstances'],
        where: { title: name }
    })
}

export const saveBook = async (book: Book) => {
    return await bookRepository.save(book)
}

export const deleteBook = async (id: number) => {
    return await bookRepository.delete(id)
}
