import { Observable } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';



export class DeleteMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: string): Observable<boolean> {

            return this.memberService.delete(data);
    }
}

         