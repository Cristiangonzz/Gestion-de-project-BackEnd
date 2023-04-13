import { ICollaborationDomainService } from "src/domain/services/collaboration.service.domain";
import { DeleteCollaborationUseCase } from "./delete-collaboration.use-case";
import { CollaborationDomainEntity } from "src/domain/entities/collaboration.entity.domain";
import { Types } from 'mongoose';
import { Observable } from "rxjs";
describe('DeleteCollaborationUseCase', () => {
    let useCase: DeleteCollaborationUseCase;
    let service: ICollaborationDomainService<CollaborationDomainEntity>;
  
    beforeEach(() => {
      service = {
          delete: jest.fn(),
      } as any as  ICollaborationDomainService<CollaborationDomainEntity>;
      useCase = new DeleteCollaborationUseCase(service);
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
  