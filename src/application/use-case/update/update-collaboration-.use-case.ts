import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';
import { CreateCollaborationDto } from 'src/infrastructura/dto/create/create-collaboration.dto';



export class UpdateCollaborationUseCase {  
  
   
    constructor(private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>) { }

        execute(id:string ,data: CreateCollaborationDto): Observable<CollaborationDomainEntity> {

            const newCollaboration = new CollaborationDomainEntity();
            newCollaboration.comment = data.comment;
            newCollaboration.notification = data.notification;
            newCollaboration.performence = data.performence;
            newCollaboration.progress = data.progress;
        
            return this.collaborationService.update(id,newCollaboration);
    }
}

         