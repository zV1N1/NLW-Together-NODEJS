import { getCustomRepository } from 'typeorm'
import { TagsRepository } from '../repositories/TagsRepositories'

class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepository);

        if (!name) {
            throw new Error("Incorrect name!");
        }

        const tagsAlreadyExists = await tagsRepositories.findOne({
            name,
        })

        if (tagsAlreadyExists) {
            throw new Error("Tag already exists!")
        }

        const tag = tagsRepositories.create({
            name
        })

        await tagsRepositories.save(tag)

        return tag
    }
}

export { CreateTagService }
