import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";
import { In } from "typeorm";

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
    const genre = await genreRepository.findOne({
        relations: [ 'books' ],
        where: { id: id }
    })
    return genre;
}

export const getGenresByIds = async (ids: string[]) => {
    return await genreRepository.find({
        where: { id: In(ids.map((item) => parseInt(item))) }
    });
};

export const getGenreByName = async (name: string) => {
    return await genreRepository.findOne({
        where: { name: name }
    })
}

export const saveGenre = async (genre: Genre) => {
    await genreRepository.save(genre)
    return
}

export const deleteGenre = async (id: number) => {
    await genreRepository.delete(id)
}
