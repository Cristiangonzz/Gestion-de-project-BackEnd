import { Types } from 'mongoose';
import { UpdateTeamUseCase } from './update-team-.use-case';
import { ITeamDomainService } from 'src/domain/services/team.service.domain';
import { TeamDomainEntity } from 'src/domain/entities/team.entity.domain';
import { Observable } from 'rxjs';
import { TeamSchema } from 'src/infrastructura/dataBase/schema/team.shema.infrastructura.data-base';

describe('UpdateTeamUseCase', () => {
  let useCase: UpdateTeamUseCase;
  let service: ITeamDomainService<TeamDomainEntity>;

  beforeEach(() => {
    service = {
        update: jest.fn(),
    } as any as  ITeamDomainService<TeamDomainEntity>;
    useCase = new UpdateTeamUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.actualizar', (done) => {
    // Arrange
    const _id = new Types.ObjectId("6425e193cc50b70709e09bfe");
    const payload: TeamDomainEntity = 
    { 
        name: "name",
        member: ["member"],
        task: ["task"],
        project: "project",
        collaboration: ["collaboration"],
    };
    const mockData: TeamDomainEntity = 
    { 
        name: "name",
        member: ["member"],
        task: ["task"],
        project: "project",
        collaboration: ["collaboration"],
    };
    const expectedData : TeamDomainEntity = 
    {
        name: "name",
        member: ["member"],
        task: ["task"],
        project: "project",
        collaboration: ["collaboration"],
    };
    const expectedInstanceType = Observable<TeamSchema>;
    const stubUpdate = jest.fn(() =>
        new Observable<TeamSchema>((subscriber) => {
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
