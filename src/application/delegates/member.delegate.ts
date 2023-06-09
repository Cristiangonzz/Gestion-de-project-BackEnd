import { Observable } from 'rxjs';
import { IMemberDomainService } from '../../domain/services/member.service.domain';
import { MemberDomainEntity } from '../../domain/entities/member.entity.domain';
import { RegisterMemberUseCase } from '../use-case/create/register-member.use-case';
import { IUseCase } from '../../domain/interfaces/use-case.interface.domain';
import { DeleteMemberUseCase } from '../use-case/delete/delete-member.use-case';
import { GetMemberUseCase } from '../use-case/get/get-member.use-case';
import { UpdateMemberUseCase } from '../use-case/update/update-member.use-case';
import { SignInMemberUseCase } from '../sign-in/sign-in.use-case';
import { GetEmailMemberUseCase } from '../use-case/get/get-email-member.use-case';
import { FindAllMemberUseCase } from '../use-case/findAll/find-all-member.use-case';

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
  toFindEmailMembers(): void {
    this.delegate = new GetEmailMemberUseCase(this.memberService);
  }
  toFindAllMembers(): void {
    this.delegate = new FindAllMemberUseCase(this.memberService);
  }

  toUpdateMember(): void {
    this.delegate = new UpdateMemberUseCase(this.memberService);
  }

  toSignInMember(): void {
    this.delegate = new SignInMemberUseCase(this.memberService);
  }
}
