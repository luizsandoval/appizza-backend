import { compare, genSalt, hash } from 'bcrypt';

const validatePassword = async (password: string, hash: string) => await compare(password, hash);

const encryptPassword = async (password: string) => (
    await hash(
        password, 
        await genSalt()
    )
);

export {
    validatePassword,
    encryptPassword,
};
