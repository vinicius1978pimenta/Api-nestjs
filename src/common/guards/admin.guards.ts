import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuards implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('---- passou aqui--');
    console.log(request['user']);
    console.log('---------');

    
    const user = request['user'];

    
    return user && user.role === 'admin'; 
  }
}
