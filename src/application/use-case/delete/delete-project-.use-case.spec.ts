import { DeleteProjectUseCase } from './delete-project-.use-case';
import { IProjectDomainService } from 'src/domain/services/project.service.domain';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';

import { Types } from 'mongoose';
import { Observable } from "rxjs";
describe('DeleteProjectUseCase', () => {
    let useCase: DeleteProjectUseCase;
    let service: IProjectDomainService<ProjectDomainEntity>;
  
    beforeEach(() => {
      service = {
          delete: jest.fn(),
      } as any as IProjectDomainService<ProjectDomainEntity>;
      useCase = new DeleteProjectUseCase(service);
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
  
         