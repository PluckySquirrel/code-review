import { AppDataSource } from "../config/data-source";
import { Author } from "../entity/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export const getNumAuthors = async () => {
    return await Promise.all([authorRepository.count()]);
};

export const getAuthorList = async () => {
    return await authorRepository.find({
        order: { firstName: 'ASC'},
    })
}

export const getAuthorById = async (id: number) => {
    return await authorRepository.findOne({
        relations: [ 'books' ],
        where: { id: id }
    })
}

export const getAuthorByName = async (firstName: string, familyName: string) => {
    return await authorRepository.findOne({
        where: { firstName, familyName }
    })
}

export const deleteAuthor = async (id: number) => {
    return await authorRepository.delete(id)
}

export const saveAuthor = async (author: Author) => {
    return await authorRepository.save(author)
}
