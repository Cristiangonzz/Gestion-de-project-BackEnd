import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';
import { GetCollaborationUseCase } from './get-collaboration-.use-case';

import { Types } from 'mongoose';
import { Observable } from 'rxjs';

describe('GetCollaborationUseCase', () => {
    let useCase: GetCollaborationUseCase;
    let service: ICollaborationDomainService<CollaborationDomainEntity>;
  
    beforeEach(() => {
      service = {
          findOneBy: jest.fn(),
      } as any as  ICollaborationDomainService<CollaborationDomainEntity>;
      useCase = new GetCollaborationUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.registrar', (done) => {
      // Arrange
      const _id = '641c65deff0153dd0f36bf5';
      const payload = 
      { 
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
          
      };
      const mockData = 
      { 
   
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
      };
      const expectedData = 
      {
        comment: "string",
        notification: "string",
        progress: "string",
        performence: "string",
      };
      const expectedInstanceType = Observable<CollaborationDomainEntity>;
      const stubRegistrar = jest.fn(() =>
          new Observable<CollaborationDomainEntity>((subscriber) => {
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
  