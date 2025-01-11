import { CustomError } from '../CustomError';

export class InternalServerError extends CustomError {
    constructor(
        message: string = 'Server error',
        errorCode: number = 500,
        originalError?: Error,
    ) {
        super(message, 500, errorCode, originalError);
    }
}
