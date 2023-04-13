import { Types } from 'mongoose';
import { Observable } from "rxjs";
import { UpdateCollaborationUseCase } from './update-collaboration-.use-case';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { CollaborationSchema } from 'src/infrastructura/dataBase/schema/collaboration.shema.infrastructura.data-base';

describe('UpdateCollaborationUseCase', () => {
    let useCase: UpdateCollaborationUseCase;
    let service:  ICollaborationDomainService<CollaborationDomainEntity>;
  
    beforeEach(() => {
      service = {
          update: jest.fn(),
      } as any as   ICollaborationDomainService<CollaborationDomainEntity>;
      useCase = new UpdateCollaborationUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.actualizar', (done) => {
      // Arrange
      const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
      const payload: CollaborationDomainEntity = 
      { 
            comment: "string",
            notification: "string",
            progress: "string",
            performence: "string",
      };
      const mockData: CollaborationDomainEntity = 
      { 
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
      };
      const expectedData : CollaborationDomainEntity = 
      {
            comment: "string",
            notification: "string",
            progress: "string",
            performence: "string",
      };
      const expectedInstanceType = Observable<CollaborationSchema>;
      const stubUpdate = jest.fn(() =>
          new Observable<CollaborationSchema>((subscriber) => {
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