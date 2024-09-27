import { AppDataSource } from "../config/data-source";
import { BookInstance } from "../entity/bookinstance.entity";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getNumBookinstances = async () => {
    const [numBookInstances, availableBookInstances] = await Promise.all([
        bookInstanceRepository.count(),
        bookInstanceRepository.findAndCount({
            where: { status: 'Available'}
        }),
    ]);
    return {
        numBookInstances,
        availableBookInstances: availableBookInstances[1],
    };
};
