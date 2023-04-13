import { TaskDomainEntity } from "src/domain/entities/task.entity.domain";
import { ITaskDomainService } from "src/domain/services/task.service.domain";
import { UpdateTaskUseCase } from "./update-task-.use-case";
import { Types } from 'mongoose';
import { Observable } from "rxjs";
import { TaskSchema } from "src/infrastructura/dataBase/schema/task.shema.infrastructura.data-base";
describe('UpdateTaskUseCase', () => {
    let useCase: UpdateTaskUseCase;
    let service: ITaskDomainService<TaskDomainEntity>;
  
    beforeEach(() => {
      service = {
          update: jest.fn(),
      } as any as  ITaskDomainService<TaskDomainEntity>;
      useCase = new UpdateTaskUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.actualizar', (done) => {
      // Arrange
      const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
      const payload: TaskDomainEntity = 
      { 
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const mockData: TaskDomainEntity = 
      { 
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const expectedData : TaskDomainEntity = 
      {
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
      };
      const expectedInstanceType = Observable<TaskSchema>;
      const stubUpdate = jest.fn(() =>
          new Observable<TaskSchema>((subscriber) => {
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