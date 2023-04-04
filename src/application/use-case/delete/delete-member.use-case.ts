import { Observable } from 'rxjs';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';



export class DeleteMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: string): Observable<boolean> {

            return this.memberService.delete(data);
    }
}

         