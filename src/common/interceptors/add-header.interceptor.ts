import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Powered-By', 'NestJS');
    response.setHeader('X-Custom', 'Valor da chave 123');

    return next.handle();
  }
}
