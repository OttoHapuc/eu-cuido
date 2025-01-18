import { CustomError, Unauthorized } from '@/error';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { userRepository } from './user.repository';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const getUserRoles = async (authHeader: string | null) => {
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
        return {user_roles: await userRepository.getUserRoles(user.id), roles: await userRepository.getRoles()};
    } catch (error: any) {
        throw new Unauthorized('Token inválido');
    }
}

export const saveUserRoleService = async (
    data: { roles: number[] },
    authHeader: string | null
) => {
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

        await userRepository.deleteUserRoles(user.id);
        
        data.roles.forEach(
            async (role) =>
                await userRepository.createUserRole({
                    user_id: user.id,
                    role_id: role,
                })
        );

        return { success: true };
    } catch (error: any) {
        throw new CustomError(error);
    }
};

export const getAddressByUserId = async (authHeader: string | null) => {
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
        return userRepository.getAddressByUserId(user.id);
    } catch (error: any) {
        throw new Unauthorized('Token inválido');
    }
}

export const saveAddressService = async (
    data: {
        id: string;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zip_code: string;
    }[],
    authHeader: string | null
) => {
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

        await userRepository.deleteUserAddress(user.id);

        data.forEach( async d => {
            const {id, ...res} = d;
            await userRepository.createAddress({
            user_id: user.id,
            ...res,
        })});

        return user;
    } catch (error: any) {
        throw new CustomError(error);
    }
};
