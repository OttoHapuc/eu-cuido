import { loginDto } from '@/server/modules/auth/auth.dto';
import { loginService } from '@/server/modules/auth/auth.service';
import { LoginResponseDto } from '@/server/modules/auth/auth.types';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = loginDto(body);
        const response: LoginResponseDto = await loginService(data);

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
}
