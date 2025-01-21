import {
    authenticatedUser,
    getAddressByUserId,
    saveAddressService,
} from '@/server/modules/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const user_id = await authenticatedUser(
            Number(req.headers.get('user_id'))
        );
        const body = await req.json();
        const data = await saveAddressService(body, user_id);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ status: error.statusCode, ...error });
    }
}

export async function GET(req: NextRequest) {
    try {
        const user_id = await authenticatedUser(
            Number(req.headers.get('user_id'))
        );
        const data = await getAddressByUserId(user_id);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ status: error.statusCode, ...error });
    }
}
