import { Observable } from 'rxjs';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';
import { RegisterMemberDto } from '../../../infrastructura/dto/create/register-member.dto';



export class RegisterMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(data: RegisterMemberDto): Observable<MemberDomainEntity> {

           
            const newMember = new MemberDomainEntity();
            newMember.name = data.name;
            newMember.document = data.document;
            newMember.role = data.role;
            newMember.salary = data.salary;
            newMember.email = data.email;
            newMember.password = data.password;
            return this.memberService.register(newMember);
    }
}

         