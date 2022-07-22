import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { Email } from "../../domain/model/user";
import { IUserRepository } from "../../domain/model/user/IUserRepository";
import { LoginUserDto } from ".";

interface LoginResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
}


interface IBuildDeps {
    userRepository: IUserRepository

}

export function buildLogin({
    userRepository
}: IBuildDeps) {
    return async function registerUser(loginUserDto: LoginUserDto): Promise<LoginResponse> {

        const existedUser = await userRepository.findByEmail(new Email(loginUserDto.email));
        if (!existedUser) {
            throw Error("this email is not exist.")
        }

        const validPassword = await validatePassword(loginUserDto.password, existedUser.password.getPassword());
        if (!validPassword) {
            throw new Error('Password is not correct');
        }
        const secret = process.env.JWT_SECRET as string;
        const accessToken = jwt.sign({ userId: existedUser.id.toString() }, secret, {
            expiresIn: "1d"
        });

        await userRepository.addAccessTokenToUser(existedUser.id, accessToken);

        return {
            user: { id: existedUser.id.toString(), email: existedUser.email.toString() },
            accessToken
        }


    }

    async function validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

}

