import { Observable } from "rxjs";
import { TeamDomainEntity } from "src/domain/entities/team.entity.domain";
import { GetTeamUseCase } from "./get-team-.use-case";
import { ITeamDomainService } from "src/domain/services/team.service.domain";

describe('GetTeamUseCase', () => {
    let useCase: GetTeamUseCase;
    let service: ITeamDomainService<TeamDomainEntity>;
  
    beforeEach(() => {
      service = {
          findOneBy: jest.fn(),
      } as any as  ITeamDomainService<TeamDomainEntity>;
      useCase = new GetTeamUseCase(service);
    });
  
    it('verificar que se defina', () => {
      expect(useCase).toBeDefined();
    });
  
    it('llamar a service.registrar', (done) => {
      // Arrange
      const _id = '641c65deff0153dd0f36bf5';
      const payload = 
      { 
            name: "name",
            member: [""],
            task: [""],
            project: "project",
            collaboration: [""],
            
      };
      const mockData = 
      { 
        name: "name",
        member: [""],
        task: [""],
        project: "project",
        collaboration: [""],
      };

      const expectedData = 
      {
        name: "name",
        member: [""],
        task: [""],
        project: "project",
        collaboration: [""],
      };

      const expectedInstanceType = Observable<TeamDomainEntity>;
      const stubRegistrar = jest.fn(() =>
          new Observable<TeamDomainEntity>((subscriber) => {
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
  