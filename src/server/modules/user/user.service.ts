import { CustomError, Unauthorized } from '@/error';
import { userRepository } from './user.repository';
import { userTransform } from './user.transform';
import { UserAdressDTO, UserRolesDTO } from './user.types';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const authenticatedUser= async (id: number) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Unauthorized('User not found');
    }
    return user.id
}

export const user = async (id: number) => {
    try {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Unauthorized('Usuário não encontrado');
        }

        return userTransform(user);
    } catch (error: any) {
        throw new CustomError(error);
    }
};

export const getUserRoles = async (id: number) => {
    try {
        return {user_roles: await userRepository.getUserRoles(id), roles: await userRepository.getRoles()};
    } catch (error: any) {
        throw new Unauthorized('Token inválido');
    }
}

export const saveUserRoleService = async (
    id: number,
    data: UserRolesDTO,
) => {
    try {

        const user = await userRepository.findById(id);
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

export const getAddressByUserId = async (id: number) => {
    try {
        return await userRepository.getAddressByUserId(id);
    } catch (error: any) {
        throw new Unauthorized('Token inválido');
    }
}

export const saveAddressService = async (
    data: UserAdressDTO[],
    user_id: number
) => {
    try {

        await userRepository.deleteUserAddress(user_id);

        data.forEach( async d => {
            const {id, ...res} = d;
            await userRepository.createAddress({
            user_id: user_id,
            ...res,
        })});

        return {success: true};
    } catch (error: any) {
        throw new CustomError(error);
    }
};
