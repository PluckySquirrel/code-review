import { AppDataSource } from "../config/data-source";
import { Book } from "../entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const getNumBooks = async () => {
    const numBooks = await Promise.all([bookRepository.count()]);
    return numBooks
};
