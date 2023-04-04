import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProyectRepository } from '../repositories/proyect.intrastructura.repositoy.data-base';
import { ProyectSchema } from '../schema/proyect.shema.infrastructura.data-base';
import { IProyectDomainService } from '../../../domain/services/proyect.service.domain';

@Injectable()
export class ProyectMongoService
  implements IProyectDomainService<ProyectSchema>
{
 
  constructor(private readonly proyectRepository: ProyectRepository) {}
  
  register(entity: ProyectSchema): Observable<ProyectSchema> {
    return this.proyectRepository.register(entity);
  }
  update(id: string, persona: ProyectSchema): Observable<ProyectSchema> {
    return this.proyectRepository.update(id, persona);
  }
  delete(id: string): Observable<boolean> {
    return this.proyectRepository.delete(id);
  }
  findAll(): Observable<ProyectSchema[]> {
    throw new Error('Method not implemented.');
  }
  findOneBy(id: string): Observable<ProyectSchema> {
      return this.proyectRepository.findOneBy(id);
  }
}
