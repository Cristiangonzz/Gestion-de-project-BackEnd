import { Body, Controller, Get, Param, Post, Put ,Delete} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollaborationService } from '../services/collaboration.service';
import { CreateCollaborationDto } from '../dto/create/create-collaboration.dto';
import { CollaborationDomainEntity } from '../../domain/entities/collaboration.entity.domain';
import { CollaborationDelegate } from 'src/application/delegates/collaboration.delegate';

@ApiTags('Collaboration')
@Controller('Collaboration')
export class CollaborationController {

    private readonly useCase: CollaborationDelegate; 
    constructor(
        private readonly collaborationService: CollaborationService ) {
            this.useCase = new CollaborationDelegate(this.collaborationService);
        }

    @ApiOperation ({summary: "create  Collaboration"})
    @Post('/create')
     createCollaboration(@Body() Collaboration: CreateCollaborationDto):Observable<CollaborationDomainEntity> {
        this.useCase.toCreateCollaboration();
        return this.useCase.execute(Collaboration);
    }


        @ApiOperation ({summary: "update  collaboration"})
    @Put('update/:id')
       updateCollaboration(@Param('id') id : string,@Body() newCollaboration: CreateCollaborationDto ):Observable<CollaborationDomainEntity>{  
            this.useCase.toUpdateCollaboration();
            return this.useCase.execute(id,newCollaboration);
       }


  @ApiOperation ({summary: "Get Collaboration"})
      @Get('get/:id')
      getCollaboration(@Param('id') id: string ):Observable<CollaborationDomainEntity>{
        this.useCase.toFindCollaborations();
        return this.useCase.execute(id);
      }
      
      
    @ApiOperation ({summary: "Delete  Collaboration"})
    @Delete('delete/:id')
        deleteCollaboration(@Param('id') id: string ):Observable<boolean>{

            this.useCase.toDeleteCollaboration();
            return this.useCase.execute(id);
        }
    }
    
