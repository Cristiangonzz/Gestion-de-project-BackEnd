import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';



export class GetCollaborationUseCase {  
  
   
    constructor(private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>) { }

        execute(data: string): Observable<CollaborationDomainEntity> {
            
            return this.collaborationService.findOneBy(data);
    }
}

         