
import { Observable } from 'rxjs';
import { GetProjectUseCase } from './get-project-.use-case';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';

describe('GetProjectUseCase', () => {
    let useCase: GetProjectUseCase;
    let service: IProjectDomainService<ProjectDomainEntity>;
  
    beforeEach(() => {
      service = {
          findOneBy: jest.fn(),
      } as any as  IProjectDomainService<ProjectDomainEntity>;
      useCase = new GetProjectUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.registrar', (done) => {
      // Arrange
      const _id = '641c65deff0153dd0f36bf5';
      const payload = 
      { 
            name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
          
      };
      const mockData = 
      { 
            
             name: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
      };

      const expectedData = 
      {
        name: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };

      const expectedInstanceType = Observable<ProjectDomainEntity>;
      const stubRegistrar = jest.fn(() =>
          new Observable<ProjectDomainEntity>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'findOneBy').mockReturnValue(stubRegistrar());
  
      // Act
      const result = useCase.execute(_id);
  
      // Assert
      expect(service.findOneBy).toHaveBeenCalledWith(_id);
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });
  