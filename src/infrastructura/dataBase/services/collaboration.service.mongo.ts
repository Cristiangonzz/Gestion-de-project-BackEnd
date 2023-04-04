import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CollaborationSchema } from '../schema/collaboration.shema.infrastructura.data-base';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';
import { CollaborationRepository } from '../repositories/collaboration.intrastructura.repositoy.data-base';

@Injectable()
export class CollaborationMongoService
  implements ICollaborationDomainService<CollaborationSchema>
{
 
  constructor(private readonly collaborationRepository: CollaborationRepository) {}
  
  register(entity: CollaborationSchema): Observable<CollaborationSchema> {
    return this.collaborationRepository.register(entity);
  }
  update(id: string, persona: CollaborationSchema): Observable<CollaborationSchema> {
    return this.collaborationRepository.update(id, persona);
  }
  delete(id: string): Observable<boolean> {
    return this.collaborationRepository.delete(id);
  }
  findAll(): Observable<CollaborationSchema[]> {
    throw new Error('Method not implemented.');
  }
  findOneBy(id: string): Observable<CollaborationSchema> {
      return this.collaborationRepository.findOneBy(id);
  }
  
}
