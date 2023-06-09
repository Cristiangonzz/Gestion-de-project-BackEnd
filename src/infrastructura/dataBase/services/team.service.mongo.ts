import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeamRepository } from '../repositories/team.intrastructura.repositoy.data-base';
import { TeamSchema } from '../schema/team.shema.infrastructura.data-base';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';

@Injectable()
export class TeamMongoService
  implements ITeamDomainService<TeamSchema>
{
 
  constructor(private readonly teamRepository: TeamRepository) {}
  
  register(entity: TeamSchema): Observable<TeamSchema> {
    return this.teamRepository.register(entity);
  }
  update(id: string, persona: TeamSchema): Observable<TeamSchema> {
    return this.teamRepository.update(id, persona);
  }
  delete(id: string): Observable<boolean> {
    return this.teamRepository.delete(id);
  }
  findAll(): Observable<TeamSchema[]> {
    return this.teamRepository.findAll();
  }
  findOneBy(id: string): Observable<TeamSchema> {
      return this.teamRepository.findOneBy(id);
  }
  
}
