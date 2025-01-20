import { Unauthorized } from '@/error';
import { InternalServerError } from '@/error/errors/InternalServerError';
import { PrismaClient, Prisma } from '@prisma/client';
import { UserAdressDTO } from './user.types';
import { UserRegisterDto } from '../auth/auth.types';

const prisma = new PrismaClient();

export const userRepository = {
    async createUser(data: UserRegisterDto) {
        try {
            return await prisma.user.create({ data });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Unauthorized('Email is not possible use');
                }
            }
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async byEmail(email: string) {
        try {
            return await prisma.user.findFirst({ where: { email } });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async findById(id: number) {
        try {
            return await prisma.user.findUnique({ where: { id } });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async deleteUserAddress(user_id: number) {
        try {
            return await prisma.address.deleteMany({ where: { user_id } });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async createAddress(data: Omit<UserAdressDTO, 'id'> & { user_id: number }) {
        try {
            return await prisma.address.create({ data });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async getAddressByUserId(user_id: number) {
        try {
            return await prisma.address.findMany({ where: { user_id } });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async deleteUserRoles(user_id: number) {
        try {
            return await prisma.user_role_assignment.deleteMany({
                where: { user_id },
            });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async createUserRole(data: { user_id: number; role_id: number }) {
        try {
            return await prisma.user_role_assignment.create({ data });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async getUserRoles(user_id: number) {
        try {
            return await prisma.user_role_assignment.findMany({
                where: { user_id },
                include: {
                    role: true,
                },
            });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async getRoles() {
        try {
            return await prisma.role.findMany();
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },
};
