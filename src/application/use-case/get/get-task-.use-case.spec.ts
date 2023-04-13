import { TaskDomainEntity } from "src/domain/entities/task.entity.domain";
import { ITaskDomainService } from "src/domain/services/task.service.domain";
import { GetTaskUseCase } from "./get-task-.use-case";
import { Observable } from "rxjs";

describe('GetTaskUseCase', () => {
    let useCase: GetTaskUseCase;
    let service: ITaskDomainService<TaskDomainEntity>;
  
    beforeEach(() => {
      service = {
          findOneBy: jest.fn(),
      } as any as  ITaskDomainService<TaskDomainEntity>;
      useCase = new GetTaskUseCase(service);
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
            description: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
            
      };
      const mockData = 
      { 
        
            name: "string",
            description: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
      };

      const expectedData = 
      {
             name: "string",
            description: "string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
      };

      const expectedInstanceType = Observable<TaskDomainEntity>;
      const stubRegistrar = jest.fn(() =>
          new Observable<TaskDomainEntity>((subscriber) => {
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
  