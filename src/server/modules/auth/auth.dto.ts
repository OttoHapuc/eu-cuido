import { z } from 'zod';
import { UserLoginDto, UserRegisterDto } from './types';
import { UnprocessableEntity } from '@/error';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const loginDto = (data: UserLoginDto) => {
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        throw new UnprocessableEntity(
            'Dados inválidos',
            422,
            undefined,
            result.error.issues
        );
    }
    return result.data;
};

const registerSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const registerDto = (data: UserRegisterDto) => {
    const result = registerSchema.safeParse(data);

    if (!result.success) {
        throw new UnprocessableEntity(
            'Dados inválidos',
            422,
            undefined,
            result.error.issues
        );
    }
    return result.data;
};
