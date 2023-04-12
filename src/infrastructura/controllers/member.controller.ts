import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable} from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../services/member.service';
import { MemberDomainEntity } from '../../domain/entities/member.entity.domain';
import { RegisterMemberDto } from '../dto/create/register-member.dto';
import { SignInDto } from '../dto/sign-in/sign-in.dto';
import { MemberDelegate } from '../../application/delegates/member.delegate';

@ApiTags('member')
@Controller('member')
export class MemberController {

     private readonly useCase: MemberDelegate;

    constructor(private readonly memberService: MemberService) {
      this.useCase = new MemberDelegate(this.memberService);
    }

    @ApiOperation ({summary: "Create  Member"})
    @Post('/create')
    registerMember(@Body() member: RegisterMemberDto):Observable<MemberDomainEntity> {
        this.useCase.toCreateMember();
        return this.useCase.execute(member);
    }


 
    @ApiOperation ({summary: "Update  member"})
    @Put('update/:id')
    updateMember(@Param('id') id : string,@Body() newMember: RegisterMemberDto ):Observable<MemberDomainEntity>{  
        this.useCase.toUpdateMember();
        return this.useCase.execute(id,newMember);
    }

    
    @ApiOperation ({summary: "Get  Member"})
    @Get('get/:id')
    getMember(@Param('id') id: string ):Observable<MemberDomainEntity>{
        this.useCase.toFindMembers();
        return this.useCase.execute(id);
    }


     
    @ApiOperation ({summary: "Delete  member"})
    @Delete('delete/:id')
    deleteMember(@Param('id') id: string ):Observable<boolean>{
        this.useCase.toDeleteMember();
        return this.useCase.execute(id);
        }

    @ApiOperation ({summary: "sign in member"})
    @Post(`signIn`) 
    signIn(@Body() member: SignInDto): Observable<string>{
        this.useCase.toSignInMember();
        return this.useCase.execute(member);
      }
  }
    
