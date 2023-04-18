import { Observable } from 'rxjs';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';



export class FindAllCollaborationUseCase {  
  
   
    constructor(private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>) { }

        execute(): Observable<CollaborationDomainEntity[]> {
            
            return this.collaborationService.findAll();
    }
}
