
import { Types } from 'mongoose';
import { Observable } from "rxjs";
import { UpdateProjectUseCase } from './update-project-.use-case';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';
import { ProjectSchema } from 'src/infrastructura/dataBase/schema/project.shema.infrastructura.data-base';

describe('UpdateProjectUseCase', () => {
    let useCase: UpdateProjectUseCase;
    let service:  IProjectDomainService<ProjectDomainEntity>;
  
    beforeEach(() => {
      service = {
          update: jest.fn(),
      } as any as   IProjectDomainService<ProjectDomainEntity>;
      useCase = new UpdateProjectUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.actualizar', (done) => {
      // Arrange
      const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
      const payload: ProjectDomainEntity = 
      { 
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const mockData: ProjectDomainEntity = 
      { 
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const expectedData : ProjectDomainEntity = 
      {
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const expectedInstanceType = Observable<ProjectSchema>;
      const stubUpdate = jest.fn(() =>
          new Observable<ProjectSchema>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'update').mockReturnValue(stubUpdate());
  
      // Act
      const result = useCase.execute(_id.toString(), payload);
  
      // Assert
      expect(service.update).toHaveBeenCalledWith(_id.toString(),mockData);
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });   