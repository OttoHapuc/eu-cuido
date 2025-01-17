import { getOnboardingDataController } from '@/server/modules/onboarding/onboarding.controller';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    return await getOnboardingDataController(req);
}