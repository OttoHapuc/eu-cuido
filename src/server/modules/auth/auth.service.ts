import { UserLoginDto, UserRegisterDto } from './auth.types';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userTransform } from './auth.transform';
import { CustomError, Unauthorized } from '@/error';
import { userRepository } from '../user/user.repository';

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

export const meService = async (authHeader: string | null) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthorized('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        const user = await userRepository.findById(decoded.id);
        if (!user) {
            throw new Unauthorized('Usuário não encontrado');
        }

        return userTransform(user);
    } catch (error: any) {
        throw new CustomError(error);
    }
};
