import { loginController } from '@/server/modules/auth/auth.controller';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    return await loginController(req);
}
