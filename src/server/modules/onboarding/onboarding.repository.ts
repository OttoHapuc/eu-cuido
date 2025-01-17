import { InternalServerError, UnprocessableEntity } from '@/error';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const onboardingRepository = {
    async getOnboardingConfig(keyword: string) {
        try {
            return await prisma.onboarding_step.findUnique({
                where: { keyword },
                include: {
                    config: {
                        include: {
                            steps: {
                                include: {
                                    fields: {
                                        include: {
                                            background: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async getUserOnboardingSteps(userId: number) {
        try {
            return await prisma.user_onboarding_step.findMany({
                where: {
                    user_id: userId,
                    deleted_at: null,
                },
                include: {
                    step: true,
                },
            });
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    },

    async getExternalTableData<T extends keyof PrismaClient>(
        external_table: T,
        external_table_where?: Prisma.Args<PrismaClient[T], 'findMany'>['where'],
        external_table_order?: Prisma.Args<PrismaClient[T], 'findMany'>['orderBy']
    ) {
        const table = prisma[external_table] as any;
        if(!table) throw new UnprocessableEntity('Tabela não encontrada')
    
        try {
            const data = await table.findMany({
                where: external_table_where,
                orderBy: external_table_order,
            })
            return data
        } catch (error: any) {
            throw new InternalServerError(
                'Erro de banco de dados, aguarde e tente novamente mais tarde.'
            );
        }
    }
};
