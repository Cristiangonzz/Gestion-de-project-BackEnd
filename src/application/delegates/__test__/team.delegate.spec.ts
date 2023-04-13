import { Observable } from 'rxjs';
import * as UseCase from '../../use-case';
import { IProjectDomainService } from '../../../domain/services/project.service.domain';
import { TaskDomainEntity } from '../../../domain/entities/task.entity.domain';
import { ITaskDomainService } from '../../../domain/services/task.service.domain';
import { TeamDelegate } from '../team.delegate';
import { CollaborationDomainEntity } from '../../../domain/entities/collaboration.entity.domain';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { TeamDomainEntity } from '../../../domain/entities/team.entity.domain';
import { ICollaborationDomainService } from '../../../domain/services/collaboration.service.domain';
import { IMemberDomainService } from '../../../domain/services/member.service.domain';
import { ITeamDomainService } from '../../../domain/services/team.service.domain';
import { ProjectDomainEntity } from 'src/domain/entities/project.entity.domain';


jest.mock('../../use-case/get/get-team-.use-case');
jest.mock('../../use-case/create/create-team-.use-case');
jest.mock('../../use-case/update/update-team-.use-case');
jest.mock('../../use-case/delete/delete-team-.use-case');

jest.mock('../../use-case/create/agregate-collaboration-team.use-case');
jest.mock('../../use-case/create/agregate-member-team.use-case');
jest.mock('../../use-case/create/agregate-task-team.use-case');


describe('TeamDelegate', () => {
  let delegator: TeamDelegate;
  let ServiceTeam:  ITeamDomainService<TeamDomainEntity>;
  let ServiceCollaboration: ICollaborationDomainService<CollaborationDomainEntity>;
  let ServiceTask:IMemberDomainService<MemberDomainEntity>;
  let ServiceMember: ITaskDomainService<TaskDomainEntity>;
  let ServiceProject:IProjectDomainService<ProjectDomainEntity>;

  const mockData = 
    {
      name: "cris",
      member: ["cris", "jose"],
      task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
      project: "FullStack",
      collaboration: ["hagan bien las coasas"],
    } as TeamDomainEntity;

  const expectedData = 
    {
      name: "cris",
      member: ["cris", "jose"],
      task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
      project: "FullStack",
      collaboration: ["hagan bien las coasas"],
    } as TeamDomainEntity;
    
  beforeEach(() => {
    // Arrange
    ServiceTeam = {
      register: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as ITeamDomainService<TeamDomainEntity>;

    // Act
    delegator = new TeamDelegate(ServiceTeam, ServiceCollaboration, ServiceTask, ServiceMember,ServiceProject);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call Service.find', (done) => {
    // Arrange
    
    const expectedInstanceType = Observable<TeamDomainEntity[]>;
    const stubFind = jest.fn(
      () =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'GetTeamUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    delegator.toFindTeams();
    const result = delegator.execute<Observable<TeamDomainEntity>>();

    // Assert
    expect(stubFind).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.create', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload = {
      name: "cris",
      member: ["cris", "jose"],
      task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
      project: "FullStack",
      collaboration: ["hagan bien las coasas"],
     };
    const expectedData = { 
      _id, 
      name: "cris",
      member: ["cris", "jose"],
      task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
      project: "FullStack",
      collaboration: ["hagan bien las coasas"],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    const stubCreate = jest.fn(
      (team) =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next({ _id, ...team } as TeamDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateTeamUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    delegator.toCreateTeam();
    const result = delegator.execute<Observable<TeamDomainEntity>>(payload);

    // Assert
    expect(stubCreate).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.update', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
   
    const expectedData = 
    {
       _id, 
       name: "cris",
       member: ["cris", "jose"],
       task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
       project: "FullStack",
       collaboration: ["hagan bien las coasas"],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as TeamDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateTeamUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toUpdateTeam();
    const result = delegator.execute<Observable<TeamDomainEntity>>(_id, mockData);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.delete', (done) => {
    // Arrange
    const payload = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'DeleteTeamUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    delegator.toDeleteTeam();
    const result = delegator.execute<Observable<boolean>>(payload);

    // Assert
    expect(stubDelete).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });





  it('should call Service.agregateTask', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
   
    const expectedData = 
    {
       _id, 
       name: "cris",
       member: ["cris", "jose"],
       task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
       project: "FullStack",
       collaboration: ["hagan bien las coasas"],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as TeamDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'AgregateTaskOfTeamUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toAgregateTaskOfTeam();
    const result = delegator.execute<Observable<TeamDomainEntity>>(_id, mockData);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });


  it('should call Service.agregateCollaboration', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
   
    const expectedData = 
    {
       _id, 
       name: "cris",
       member: ["cris", "jose"],
       task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
       project: "FullStack",
       collaboration: ["hagan bien las coasas"],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as TeamDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'AgregateCollaborationOfTeamUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toAgregateCollaborationOfTeam();
    const result = delegator.execute<Observable<TeamDomainEntity>>(_id, mockData);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call Service.agregateMember', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
   
    const expectedData = 
    {
       _id, 
       name: "cris",
       member: ["cris", "jose"],
       task: ["hacer las pruebas unitarias", "hacer las pruebas de integracion"],
       project: "FullStack",
       collaboration: ["hagan bien las coasas"],
    };
    const expectedInstanceType = Observable<TeamDomainEntity>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<TeamDomainEntity>((subscriber) => {
          subscriber.next({ _id: id, ...data } as TeamDomainEntity);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'AgregateMemberOfTeamUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    delegator.toAgregateMemberOfTeam();
    const result = delegator.execute<Observable<TeamDomainEntity>>(_id, mockData);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
