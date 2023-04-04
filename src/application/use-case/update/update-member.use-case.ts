import { Observable } from 'rxjs';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { RegisterMemberDto } from 'src/infrastructura/dto/create/register-member.dto';



export class UpdateMemberUseCase {  
  
   
    constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

        execute(id:string,data: RegisterMemberDto): Observable<MemberDomainEntity> {

           
            const newMember = new MemberDomainEntity();
            newMember.name = data.name;
            newMember.document = data.document;
            newMember.role = data.role;
            newMember.salary = data.salary;
            newMember.email = data.email;
            newMember.password = data.password;
            return this.memberService.update(id,newMember);
    }
}

         