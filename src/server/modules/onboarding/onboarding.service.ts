import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import { CustomError, Unauthorized } from '@/error';
import { onboardingRepository } from './onboarding.repository';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || 'secret';

export const getOnboardingDataService = async (keyword: string, authHeader: string | null) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthorized('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            throw new Unauthorized('Usuário não encontrado');
        }

        const config = await onboardingRepository.getOnboardingConfig(keyword);
        console.log(config)
        if (!config) {
            throw new CustomError('Configuração de onboarding não encontrada', 404);
        }

        const userSteps = await onboardingRepository.getUserOnboardingSteps(user.id);

        const options = await Promise.all(config.config.flatMap(configItem =>
            configItem.steps.flatMap(step =>
                step.fields.map(async (field) => {
                    if (field.external_table) {
                        const table = field.external_table as keyof PrismaClient;
                        const where  = field.external_table_where ? JSON.parse(field.external_table_where) : undefined;
                        const order = field.external_table_order ? JSON.parse(field.external_table_order) : undefined;
                        const values = await onboardingRepository.getExternalTableData(table, where, order);
                        return { field_id: field.id, values: values?.map((item: any) => ({ value: item.id, description: item.name, order: item.order || 0 })) || [] }
                    }
                    return null
                })
            )
        )).then(results => results.filter(Boolean));

        return { ...config, userSteps, options };
    } catch (error: any) {
        throw new CustomError(error);
    }
};