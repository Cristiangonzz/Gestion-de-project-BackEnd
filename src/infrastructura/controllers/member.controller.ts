import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError} from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../services/member.service';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { RegisterMemberUseCase } from 'src/application/use-case/create/register-member.use-case';
import { RegisterMemberDto } from '../dto/create/register-member.dto';
import { UpdateMemberUseCase } from 'src/application/use-case/update/update-member.use-case';
import { GetMemberUseCase } from 'src/application/use-case/get/get-member.use-case';
import { DeleteMemberUseCase } from 'src/application/use-case/delete/delete-member.use-case';
import { SignInDto } from '../dto/sign-in/sign-in.dto';
import { SignInMemberUseCase } from 'src/application/sign-in/sign-in.use-case';

@ApiTags('member')
@Controller('member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService ) {}

    @ApiOperation ({summary: "Create  Member"})
    @Post('/create')
     crearmember(@Body() member: RegisterMemberDto):Observable<MemberDomainEntity> {
        const caso = new RegisterMemberUseCase(this.memberService);
        return caso.execute(member).pipe(
        catchError((error : Error) => {
            throw new Error(`not register member ${error}`);
          }));

    }


 
     @ApiOperation ({summary: "Update  member"})
     @Put('update/:id')
        updateMember(@Param('id') id : string,@Body() memberEditada: RegisterMemberDto ):Observable<MemberDomainEntity>{  
             const caso = new UpdateMemberUseCase(this.memberService);
             return caso.execute(id,memberEditada)
             .pipe(
                catchError((error) => {
                console.error('Error in Update Member', error);
                throw new Error('Not Update Member');
              }));
    }




    
    @ApiOperation ({summary: "Get  Member"})
     @Get('get/:id')
     getMember(@Param('id') id: string ):Observable<MemberDomainEntity>{
        const caso = new GetMemberUseCase(this.memberService);
        
        return caso.execute(id).pipe(
        catchError((error) => {
            console.error('Error in Get Member', error);
            throw new Error('Not Get Member');
          }));
     }


     
    @ApiOperation ({summary: "Delete  member"})
    @Delete('delete/:id')
        delteMember(@Param('id') id: string ):Observable<boolean>{

            const caso = new DeleteMemberUseCase(this.memberService)
            return caso.execute(id)
                .pipe(
                catchError((error) => {
                console.error('Error in delete Member', error);
                throw new Error('Not delete Member');
              }));
        }

      @ApiOperation ({summary: "sign in member"})
      @Post(`signIn`) 
      signIn(@Body() member: SignInDto): Observable<string>{
          const caso = new SignInMemberUseCase(this.memberService);
          return caso.execute(member);
      }
  }
    
    // @ApiOperation ({summary: "Iniciar Sesion member"})
    // @Post(`signIn`) 
    
    // signIn(@Body() user: LogearseDto): Observable<string>{
    //     const caso = new LogearmemberoUseCase(this.memberService);
    //     return caso.execute(user);
    // }
