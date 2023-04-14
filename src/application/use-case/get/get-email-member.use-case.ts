import { Observable } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';



export class GetEmailMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: string): Observable<MemberDomainEntity> {

            return this.memberService.findOneByEmail(data);
    }
}

         