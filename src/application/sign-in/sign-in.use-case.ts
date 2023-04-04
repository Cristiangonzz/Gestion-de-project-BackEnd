import { Observable, from, of, switchMap } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { IMemberDomainService } from '../../domain/services/member.service.domain';
import { MemberDomainEntity } from '../../domain/entities/member.entity.domain';
import { SignInDto } from '../../infrastructura/dto/sign-in/sign-in.dto';


export class SignInMemberUseCase {  
  
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(dato: SignInDto): Observable<string> {

            return from(this.memberService.findOneByEmail(dato.email)).pipe(
                switchMap((member) => {
                 
                   if(member.password !== dato.password) throw new Error("incorrect credentials");
                           
                    return of(jwt.sign({member},`tokenEntrada`));

                  })
                );
        }
}
