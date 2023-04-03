import { Injectable } from '@nestjs/common';
import { MemberMongoService } from '../dataBase/services/member.service.mongo';

@Injectable()
export class MemberService extends MemberMongoService  {
}
