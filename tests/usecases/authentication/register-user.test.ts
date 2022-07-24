import { User } from "../../../src/domain/model/user";

import { CreateUserDto } from '../../../src/usecases/authentication';
import { buildRegisterUser } from '../../../src/usecases/authentication/register-user';
import { UserRepository } from "../../../src/adapters/mongodb-repo/user/UserRepository"

jest.mock("../../../src/adapters/mongodb-repo/user/UserRepository");
const userRepository = new UserRepository();

describe('The New User Regiseration', () => {

    describe('when registering a user', () => {
        describe('if the email is already existed', () => {
            it('should throw an error', async () => {

                const userData: CreateUserDto = {
                    name: 'Mohamed Galal',
                    email: 'mohamed.galal@test.com',
                    password: '123',
                };


                const user = new User("userId-123", "Mohamed Galal", "mohamed.galal30@test.com", "123", "roleId-123");

                //@ts-ignore
                userRepository.findByEmail.mockResolvedValue(user);

                const registerUser = buildRegisterUser({ userRepository });

                await expect(registerUser(userData))
                    .rejects.toMatchObject(new Error("user already exists."));

            });
        });

        describe('if the email is not existed', () => {
            it('should not throw an error', async () => {
                const userData: CreateUserDto = {
                    name: 'Mohamed Galal',
                    email: 'mohamed.galal@test.com',
                    password: '123',
                };

                const user = new User("userId-123", "Mohamed Galal", "mohamed.galal30@test.com", "123", "roleId-123");

                //@ts-ignore
                userRepository.findByEmail.mockResolvedValue(undefined);
                //@ts-ignore
                userRepository.add.mockResolvedValue(user);

                const registerUser = buildRegisterUser({ userRepository });

                await expect(registerUser(userData))
                    .resolves.toMatchObject(user);
            });
        });

    });
});
