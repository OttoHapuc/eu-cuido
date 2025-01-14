import { Unauthorized } from '@/error';
import { InternalServerError } from '@/error/errors/InternalServerError';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
    async createUser(data: { name: string; email: string; password: string }) {
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
};
