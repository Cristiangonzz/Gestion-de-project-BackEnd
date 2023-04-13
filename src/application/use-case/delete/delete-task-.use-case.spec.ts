import { Types } from 'mongoose';
import { Observable } from "rxjs";
import { DeleteTaskUseCase } from './delete-task-.use-case';
import { ITaskDomainService } from 'src/domain/services/task.service.domain';
import { TaskDomainEntity } from 'src/domain/entities/task.entity.domain';
describe('DeleteTaskUseCase', () => {
    let useCase: DeleteTaskUseCase;
    let service:ITaskDomainService<TaskDomainEntity>;
  
    beforeEach(() => {
      service = {
          delete: jest.fn(),
      } as any as ITaskDomainService<TaskDomainEntity>;
      useCase = new DeleteTaskUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.delete', (done) => {
      // Arrange
      const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
  
      const mockData: boolean = true;
      const expectedData : boolean = true;
  
      const expectedInstanceType = Observable<boolean>;
      const stubDelete = jest.fn(() =>
          new Observable<boolean>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
      jest.spyOn(service, 'delete').mockReturnValue(stubDelete());
  
      // Act
      const result = useCase.execute(_id.toString());
  
      // Assert
      expect(service.delete).toHaveBeenCalledWith(_id.toString());
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
        },
        complete: () => done(),
      });
    });
  });
  
         