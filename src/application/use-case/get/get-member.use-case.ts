import { Observable } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';
import { RegisterMemberDto } from '../../../infrastructura/dto/create/register-member.dto';



export class GetMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: string): Observable<MemberDomainEntity> {

            return this.memberService.findOneBy(data);
    }
}

         