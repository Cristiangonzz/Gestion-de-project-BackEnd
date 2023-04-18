import { Observable } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';



export class FindAllMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(): Observable<MemberDomainEntity[]> {

            return this.memberService.findAll();
    }
}

         