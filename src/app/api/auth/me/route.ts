import { authenticatedUser, user } from '@/server/modules/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const user_id = await authenticatedUser(Number(req.headers.get('user_id')));
    try {
        const response = await user(user_id);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ ...error }, { status: error.statusCode });
    }
}
