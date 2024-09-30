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
