import { BookInstanceStatus } from "../constants";
import { AppDataSource } from "../config/data-source";
import { BookInstance } from "../entity/bookinstance.entity";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getNumBookinstances = async () => {
    const [numBookInstances, availableBookInstances] = await Promise.all([
        bookInstanceRepository.count(),
        bookInstanceRepository.findAndCount({
            where: { status: BookInstanceStatus.Available}
        }),
    ]);
    return {
        numBookInstances,
        availableBookInstances: availableBookInstances[1],
    };
};

export const getListBookInstances = async () => {
    return await bookInstanceRepository.find({
        order: { imprint: 'ASC' },
        relations: ['book']
    })
}

export const getBookInstanceById = async (id: number) => {
    return await bookInstanceRepository.findOne({
        relations: [ 'book' ],
        where: { id: id }
    })
}

export const getBookInstanceByName = async (name: string) => {
    return await bookInstanceRepository.findOne({
        relations: [ 'book' ],
        where: {
            book: {
                title: name
            }
        }
    })
}

export const saveBookInstance = async (bookInstance: BookInstance) => {
    return await bookInstanceRepository.save(bookInstance)
}

export const deleteBookInstance = async (id: number) => {
    return await bookInstanceRepository.delete(id)
}
