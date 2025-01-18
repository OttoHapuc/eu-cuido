import { getAddressByUserId, saveAddressService } from '@/server/modules/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const authHeader = req.headers.get('Authorization');
        const data = await saveAddressService(body, authHeader);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ status: error.statusCode, ...error });
    }
}

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const data = await getAddressByUserId(authHeader);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ status: error.statusCode, ...error });
    }
}