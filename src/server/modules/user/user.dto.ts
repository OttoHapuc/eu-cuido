import { z } from 'zod';
import { UnprocessableEntity } from '@/error';
import { UserAdressDTO, UserRolesDTO } from './user.types';

const rolesSchema = z.object({
    roles: z.array(z.number()).nonempty('O array de roles não pode estar vazio'),
});

export const rolesDto = (data: UserRolesDTO) => {
    const result = rolesSchema.safeParse(data);

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

const addressSchema = z.object({
    id: z.string(),
    street: z.string().min(3, 'A rua deve ter pelo menos 3 caracteres'),
    number: z.string().min(1, 'O número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(3, 'O bairro deve ter pelo menos 3 caracteres'),
    city: z.string().min(3, 'A cidade deve ter pelo menos 3 caracteres'),
    state: z.string().min(2, 'O estado deve ter pelo menos 2 caracteres'),
    zip_code: z.string().length(8, 'O CEP deve ter exatamente 8 caracteres'),
});

export const addressDto = (data: UserAdressDTO[]) => {
    const result = z.array(addressSchema).safeParse(data);

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
