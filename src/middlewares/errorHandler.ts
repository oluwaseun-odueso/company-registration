import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
 
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  sendErrorResponse(res: Response): void {
    res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
    });
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'false';

  constructor(message: string) {
    super(message);
  }
}
export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'false';

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'false';

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'false';

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'false';

  constructor(message: string) {
    super(message);
  }
}