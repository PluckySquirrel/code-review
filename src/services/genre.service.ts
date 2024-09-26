import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export const getNumGenres = async () => {
    const numGenres = await Promise.all([genreRepository.count()]);
    return numGenres
};

export const getListGenres = async () => {
    return await genreRepository.find({
        order: { name: 'ASC' }
    })
}
