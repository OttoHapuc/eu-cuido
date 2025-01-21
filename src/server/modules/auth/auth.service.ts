import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '@/error';
import { userRepository } from '../user/user.repository';
import { userTransform } from '../user/user.transform';
import { UserLoginDto, UserRegisterDto } from './auth.types';

const jwtSecret = process.env.JWT_SECRET ?? 'secret';
const jwtExpiration = process.env.JWT_EXPIRATION ?? '1d';
const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10');

export const loginService = async (data: UserLoginDto) => {
    const user = await userRepository.byEmail(data.email);

    if (!user) {
        throw new Unauthorized('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
        throw new Unauthorized('Credenciais inválidas');
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiration,
    });
    return {
        token,
        user: userTransform(user),
    };
};

export const registerService = async (data: UserRegisterDto) => {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const userExist = await userRepository.byEmail(data.email);

    if (userExist) {
        throw new Unauthorized('Email não possível para uso');
    }

    const user = await userRepository.createUser({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiration,
    });

    return {
        token,
        user: userTransform(user),
    };
};
