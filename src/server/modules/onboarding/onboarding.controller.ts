import { NextRequest, NextResponse } from 'next/server';
import { getOnboardingDataService } from './onboarding.service';

export const getOnboardingDataController = async (req: NextRequest): Promise<Response> => {
    try {
        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get('keyword') || '';
        const authHeader = req.headers.get('Authorization');
        const data = await getOnboardingDataService(keyword, authHeader);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ status: error.statusCode, ...error });
    }
};