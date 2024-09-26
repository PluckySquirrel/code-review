import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export const getNumGenres = async () => {
    const numGenres = await Promise.all([genreRepository.count()]);
    return numGenres
};

export const getListGenres = async () => {
    const listGenres = await genreRepository.find({
        order: { name: 'ASC' }
    })
    return listGenres
}

export const getGenreById = async (id: number) => {
    return await genreRepository.findOne({
        relations: [ 'books' ],
        where: { id: id }
    })
}