import { meController } from '@/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    return await meController(req);
}
