import { Observable } from 'rxjs';
import { ProyectDomainEntity } from 'src/domain/entities/proyect.entity.domain';
import { IProyectDomainService } from 'src/domain/services/proyect.service.domain';
import { CreateProyectDto } from 'src/infrastructura/dto/create/create-proyect.dto';

export class CreateProyectUseCase {  
   
    constructor(private readonly proyectService: IProyectDomainService<ProyectDomainEntity>) { }

        execute(data: CreateProyectDto): Observable<ProyectDomainEntity> {

            const newProyect = new ProyectDomainEntity();
            newProyect.name = data.name;
            newProyect.dataExpiration = data.dataExpiration;
            newProyect.priority = data.priority;
            newProyect.progress = data.progress;
            
            return this.proyectService.register(newProyect);
    }
}

         