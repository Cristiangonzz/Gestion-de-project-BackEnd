import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable, catchError ,of,map } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()

export class UsuarioGuard implements CanActivate {
 
  canActivate( context: ExecutionContext): Observable<boolean>   {
    const request = context.switchToHttp().getRequest();
    const { token } = request.params; 
    const secret =  `tokenEntrada`;
    const decodificar = jwt.verify(token, secret)

    return of(decodificar)
    .pipe(
      map( () => {          
          return true;}
      ),
      catchError(() => 
         of(false))
    )
  }
}

