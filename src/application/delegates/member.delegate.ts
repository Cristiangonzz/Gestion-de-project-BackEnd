import { Observable } from 'rxjs';
import { IMemberDomainService } from 'src/domain/services/member.service.domain';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { RegisterMemberUseCase } from '../use-case/create/register-member.use-case';
import { IUseCase } from 'src/domain/interfaces/use-case.interface.domain';
import { DeleteMemberUseCase } from '../use-case/delete/delete-member.use-case';
import { GetMemberUseCase } from '../use-case/get/get-member.use-case';
import { UpdateMemberUseCase } from '../use-case/update/update-member.use-case';

export class MemberDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly memberService: IMemberDomainService<MemberDomainEntity>) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateMember(): void {
    this.delegate = new RegisterMemberUseCase(this.memberService);
  }

  toDeleteMember(): void {
    this.delegate = new DeleteMemberUseCase(this.memberService);
  }

  toFindMembers(): void {
    this.delegate = new GetMemberUseCase(this.memberService);
  }

  toUpdateMember(): void {
    this.delegate = new UpdateMemberUseCase(this.memberService);
  }
}
