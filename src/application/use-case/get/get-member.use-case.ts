import { Observable } from 'rxjs';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { RegisterMemberDto } from 'src/infrastructura/dto/create/register-member.dto';



export class GetMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: string): Observable<MemberDomainEntity> {

            return this.memberService.findOneBy(data);
    }
}

         