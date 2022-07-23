import { User, IUserRepository } from "../../domain/model/user";
import { CreateUserDto } from ".";

interface RegisterResponse {
    id: string;
    name: string;
    email: string;
}



interface IBuildDeps {
    userRepository: IUserRepository
}

export function buildRegisterUser({
    userRepository
}: IBuildDeps) {
    return async function registerUser(userDto: CreateUserDto): Promise<RegisterResponse> {
        const id = await userRepository.nextIdentity()
        console.log(">>>>>>>>>>>", id)
        const toBeCreatedUser = new User(
            await userRepository.nextIdentity(),
            userDto.name,
            userDto.email,
            userDto.password
        );
        const userExists = await userRepository.findByEmail(toBeCreatedUser.email);
        if (userExists) {
            throw new Error("user already exists.");
        }


        const createdUser = await userRepository.add(toBeCreatedUser);

        return {
            id: createdUser.id.toString(),
            name: createdUser.name,
            email: createdUser.email.toString()
        };

    }
}

