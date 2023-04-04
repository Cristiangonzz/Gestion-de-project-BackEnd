import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';



export class DeleteCollaborationUseCase {  
  
   
    constructor(private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>) { }

        execute(data: string): Observable<boolean> {
            
            return this.collaborationService.delete(data);
    }
}

         