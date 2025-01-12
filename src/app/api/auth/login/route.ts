import { loginController } from '@/server';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    return await loginController(req);
}
