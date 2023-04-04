import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
/* If the exception is a MongoServerError, then get the response object from the host, set the status
code to 409, and return a JSON object with the status code, message, and details */
export class MongoServerErrorExceptionFilter
  implements ExceptionFilter<MongoServerError>
{
  /**
   * If the exception is a MongoServerError, then get the response object from the host, set the status
   * code to 409, and return a JSON object with the status code, message, and details.
   * @param {MongoServerError} exception - MongoServerError - The exception that was thrown.
   * @param {ArgumentsHost} host - ArgumentsHost
   */
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.CONFLICT;
    const details = exception;

    response.status(statusCode).json({ statusCode, message, details });
  }
}
