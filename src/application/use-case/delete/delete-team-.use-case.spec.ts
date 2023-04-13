import { TeamDomainEntity } from "src/domain/entities/team.entity.domain";
import { DeleteTeamUseCase } from "./delete-team-.use-case";
import { ITeamDomainService } from "src/domain/services/team.service.domain";
import { Types } from 'mongoose';
import { Observable } from "rxjs";

describe('DeleteTeamUseCase', () => {
    let useCase: DeleteTeamUseCase;
    let service: ITeamDomainService<TeamDomainEntity>;
  
    beforeEach(() => {
      service = {
          delete: jest.fn(),
      } as any as ITeamDomainService<TeamDomainEntity>;
      useCase = new DeleteTeamUseCase(service);
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
  