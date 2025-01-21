import { registerDto } from '@/server/modules/auth/auth.dto';
import { registerService } from '@/server/modules/auth/auth.service';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = registerDto(body);
        const user = await registerService(data);

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
}
