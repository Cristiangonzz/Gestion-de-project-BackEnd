import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MemberSchema } from '../schema/member.shema.infrastructura.data-base';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';
import { MemberRepository } from '../repositories/member.intrastructura.repositoy.data-base';

@Injectable()
export class MemberMongoService
  implements IMemberDomainService<MemberSchema>
{
 
  constructor(private readonly memberRepository: MemberRepository) {}

  findOneByEmail(email: string): Observable<MemberSchema> {
    return this.memberRepository.findOneByEmail(email);
  }

  register(entity: MemberSchema): Observable<MemberSchema> {
    return this.memberRepository.register(entity);
  }

  update(id: string, persona: MemberSchema): Observable<MemberSchema> {
    return this.memberRepository.update(id, persona);
  }

  delete(id: string): Observable<boolean> {
    return this.memberRepository.delete(id);
  }
  
  findAll(): Observable<MemberSchema[]> {
    return this.memberRepository.findAll();
  }
  findOneBy(id: string): Observable<MemberSchema> {
    return this.memberRepository.findOneBy(id);
  }
}
