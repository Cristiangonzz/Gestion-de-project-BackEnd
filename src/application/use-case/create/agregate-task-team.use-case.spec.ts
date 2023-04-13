import { Observable } from 'rxjs';
import {  AgregateTaskOfTeamUseCase } from "./agregate-task-team.use-case";
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { AgregateTaskOfTeamDto } from '../../../infrastructura/dto/create/agregate-task-of-team.dto';
import { GetTaskUseCase } from '../get/get-task-.use-case';
import { GetTeamUseCase } from '../get/get-team-.use-case';
describe('AgregateTaskOfTeamUseCase', () => {
  let useCase: AgregateTaskOfTeamUseCase;
  let service: ITeamDomainService<TeamDomainEntity>;
  let serviceTask : ITaskDomainService<TaskDomainEntity>;

  beforeEach(() => {
    service = {
      update: jest.fn(),
      findOneBy: jest.fn(),
    } as any as  ITeamDomainService<TeamDomainEntity>;
    serviceTask = {
        findOneBy: jest.fn(),
    } as any as  ITaskDomainService<TaskDomainEntity>;

    useCase = new AgregateTaskOfTeamUseCase(service,serviceTask);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('call usecase ', (done) => {
    // Arrange
    const _idTeam = '641c65deff0153dd0f36bf5';
    const _idTask = '641c65deff0153dd0f36bf6';
    const payload = 
    { 
        //_idTeam,
        name: "string",
        member: [""],
        task: [""],
        project: "string",
        collaboration: [""],
    };
    const mockData: TeamDomainEntity = 
    { 
        name: "string",
        member: [""],
        task: [_idTask],
        project: "string",
        collaboration: [""],
    };
    const mockTask = 
    { 
       // _idTask,
        name: "string",
        description: "string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    };
    const expectedData  = 
    {
        //_idTeam,
        name: "string",
        member: [""],
        task: [_idTask],
        project: "string",
        collaboration: [""],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    
    const stubUpdate = jest.fn(() =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    
    const registers : AgregateTaskOfTeamDto= 
    { 
        team: _idTeam,
        task: _idTask,
    };
    const stubFindOneBy = jest.fn(() =>
    new Observable<TaskDomainEntity>((subscriber) => {
      subscriber.next(mockTask);
      subscriber.complete();
        }),
    );
    const stubFindOneByTeam = jest.fn(() =>
    new Observable<TeamDomainEntity>((subscriber) => {
      subscriber.next(mockData);
      subscriber.complete();
        }),
    );

    const getTaskSpy = jest.spyOn(GetTaskUseCase.prototype, 'execute');
    getTaskSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(mockTask);
      subscriber.complete();
    }));

    const getTeamSpy = jest.spyOn(GetTeamUseCase.prototype, 'execute');
    getTeamSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(payload);
      subscriber.complete();
    }));
    jest.spyOn(service, 'update').mockReturnValue(stubUpdate());
    jest.spyOn(service, 'findOneBy').mockReturnValue(stubFindOneByTeam());
    jest.spyOn(serviceTask, 'findOneBy').mockReturnValue(stubFindOneBy());

    // Act
    const result = useCase.execute(registers);

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
      },
      complete: () => done(),
    });
  });
});
