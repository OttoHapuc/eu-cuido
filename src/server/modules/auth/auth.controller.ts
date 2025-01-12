import { loginDto, registerDto } from './auth.dto';
import { loginService, meService, registerService } from './auth.service';
import { LoginResponseDto } from './types';
import { NextRequest, NextResponse } from 'next/server';

export const loginController = async (req: NextRequest): Promise<Response> => {
    try {
        const body = await req.json();
        const data = loginDto(body);
        const response: LoginResponseDto = await loginService(data);

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
};

export const registerController = async (
    req: NextRequest
): Promise<Response> => {
    try {
        const body = await req.json();
        const data = registerDto(body);
        const user = await registerService(data);

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
};

export const meController = async (req: NextRequest): Promise<Response> => {
    try {
        const token = req.headers.get('Authorization');
        const user = await meService(token);
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
};
