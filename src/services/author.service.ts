import { AppDataSource } from "../config/data-source";
import { Author } from "../entity/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export const getNumAuthors = async () => {
    const numAuthors = await Promise.all([authorRepository.count()]);
    return numAuthors;
};

export const getAuthorList = async () => {
    return await authorRepository.find({
        order: { firstName: 'ASC'},
    })
}
