import {ExecutionContext, NestInterceptor, CallHandler, Injectable} from '@nestjs/common'
import {Observable, tap} from 'rxjs'

@Injectable()
export class LoggerInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      
      const request = context.switchToHttp().getRequest()
      const methood = request.methood
      const url = request.url
      const now = Date.now()

      console.log(`[REQUEST] ${methood} ${url} inicio da request`)
      return next.handle().pipe(
        tap (() => {
          console.log(`[RESPONSE] ${methood} ${url} - ${Date.now()- now} ms`)
        })
      )
    }


}



