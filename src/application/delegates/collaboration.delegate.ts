import { Observable } from 'rxjs';
import { IUseCase } from '../../domain/interfaces/use-case.interface.domain';
import { CollaborationDomainEntity } from '../../domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from '../../domain/services/collaboration.service.domain';
import { DeleteCollaborationUseCase } from '../use-case/delete/delete-collaboration.use-case';
import { GetCollaborationUseCase } from '../use-case/get/get-collaboration-.use-case';
import { UpdateCollaborationUseCase } from '../use-case/update/update-collaboration-.use-case';
import { CreateCollaborationUseCase } from '../use-case/create/create-collaboration-.use-case';
import { FindAllCollaborationUseCase } from '../use-case/findAll/find-all-collaboration.use-case';

export class CollaborationDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly collaborationService: ICollaborationDomainService<CollaborationDomainEntity>) { }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateCollaboration(): void {
    this.delegate = new CreateCollaborationUseCase(this.collaborationService);
  }

  toDeleteCollaboration(): void {
    this.delegate = new DeleteCollaborationUseCase(this.collaborationService);
  }

  toFindCollaborations(): void {
    this.delegate = new GetCollaborationUseCase(this.collaborationService);
  }
  toFindAllCollaborations(): void {
    this.delegate = new FindAllCollaborationUseCase(this.collaborationService);
  }

  toUpdateCollaboration(): void {
    this.delegate = new UpdateCollaborationUseCase(this.collaborationService);
  }

}
