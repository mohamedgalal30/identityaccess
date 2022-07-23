import { User, IUserRepository } from "../../domain/model/user";
import { CreateUserDto } from ".";


interface IBuildDeps {
    userRepository: IUserRepository
}

export function buildRegisterUser({
    userRepository
}: IBuildDeps) {
    return async function registerUser(userDto: CreateUserDto): Promise<User> {

        const toBeCreatedUser = new User(
            "1",
            userDto.name,
            userDto.email,
            userDto.password
        );
        const userExists = await userRepository.findByEmail(toBeCreatedUser.email);
        if (userExists) {
            throw new Error("user already exists.");
        }

        // const createdUser = await userRepository.add(toBeCreatedUser);
        // const accessToken = jwt.sign({ userId: (await createdUser).id.id }, process.env.JWT_SECRET, {
        //     expiresIn: "1d"
        // });

        return userRepository.add(toBeCreatedUser);

    }
}

