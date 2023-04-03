import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../services/member.service';
import { MemberDomainEntity } from 'src/domain/entities/member.entity.domain';
import { RegisterMemberUseCase } from 'src/application/use-case/create/register-member.use-case';
import { RegisterMemberDto } from '../dto/create/register-member.dto';

@ApiTags('member')
@Controller('member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService ) {}

    @ApiOperation ({summary: "Crear  Member"})
    @Post('/crear')
     crearmember(@Body() member: RegisterMemberDto):Observable<MemberDomainEntity> {
        const caso = new RegisterMemberUseCase(this.memberService);
        return caso.execute(member).pipe(
        catchError((error : Error) => {
            throw new Error(`not register member ${error}`);
          }));

    }
}

 // @ApiOperation ({summary: "Buscar  member"})
    //  @Get('buscar')
    //  buscarmember(@Body() id: BuscarMail ):Observable<MemberDomainEntity>{
    //     const caso = new BuscarmemberUseCase(this.memberService);
        
    //     return caso.execute(id.mail).pipe(tap((data: MemberDomainEntity) =>{
    //         this.memberBuscadaPublisher.publish(data);
    //     }),
    //     catchError((error) => {
    //         // Manejo de errores
    //         console.error('Se produjo un error al buscar la member', error);
    //         throw new Error('No se pudo buscar la member');
    //       }));
    //  }

    // @ApiOperation ({summary: "Editar  member"})
    // @Put('editar/:id')
    //    editarmember(@Param('id') id : string,@Body() memberEditada: RegistrarmemberDto ):Observable<memberSchema>{  
    //         const caso = new EditarmemberoUseCase(this.memberService);
    //         return caso.execute(id,memberEditada).pipe(tap((data: MemberDomainEntity) =>{
    //            this.memberEditadaPublisher.publish(data);
    //        }),
    //        catchError((error) => {
    //            // Manejo de errores
    //            console.error('Se produjo un error al editar la member', error);
    //            throw new Error('No se pudo editar la member');
    //          }));
    //    }

    // @ApiOperation ({summary: "Eliminar  member"})
    // @Delete('eliminar/:id')
    //     eliminarmember(@Param('id') id: string ):Observable<boolean>{

    //         const caso = new EliminarmemberoUseCase(this.memberService)
    //         return caso.execute(id)
    //             .pipe(
    //                 tap((data: boolean) =>{
    //                 this.memberEliminadaPublisher.publish(data);
    //         }),
    //         catchError((error) => {
    //             // Manejo de errores
    //             console.error('Se produjo un error al eliminar la member', error);
    //             throw new Error('No se pudo eliminar la member');
    //           }));
    //     }
    
    // @ApiOperation ({summary: "Iniciar Sesion member"})
    // @Post(`signIn`) 
    
    // signIn(@Body() user: LogearseDto): Observable<string>{
    //     const caso = new LogearmemberoUseCase(this.memberService);
    //     return caso.execute(user);
    // }
