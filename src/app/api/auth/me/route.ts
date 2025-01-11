import { meController } from '@/server/modules/auth/auth.controller';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    return await meController(req);
}
