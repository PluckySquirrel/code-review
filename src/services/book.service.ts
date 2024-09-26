import { AppDataSource } from "../config/data-source";
import { Book } from "../entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const getNumBooks = async () => {
    const numBooks = await Promise.all([bookRepository.count()]);
    return numBooks
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
