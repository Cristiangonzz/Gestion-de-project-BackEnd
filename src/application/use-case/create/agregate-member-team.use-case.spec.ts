import { ITeamDomainService } from "src/domain/services/team.service.domain";
import { AgregateMemberOfTeamUseCase } from "./agregate-member-team.use-case";
import { TeamDomainEntity } from "src/domain/entities/team.entity.domain";
import { MemberDomainEntity } from "src/domain/entities/member.entity.domain";
import { IMemberDomainService } from "src/domain/services/member.service.domain";
import { Observable } from "rxjs";
import { AgregateMemberOfTeamDto } from "src/infrastructura/dto/create/agregate-member-of-team.dto";
import { GetMemberUseCase, GetTeamUseCase } from "../get";

describe('AgregateMemberOfTeamUseCase', () => {
  let useCase: AgregateMemberOfTeamUseCase;
  let service: ITeamDomainService<TeamDomainEntity>;
  let serviceMember : IMemberDomainService<MemberDomainEntity>;

  beforeEach(() => {
    service = {
      update: jest.fn(),
      findOneBy: jest.fn(),
    } as any as  ITeamDomainService<TeamDomainEntity>;
    serviceMember = {
        findOneBy: jest.fn(),
    } as any as  IMemberDomainService<MemberDomainEntity>;

    useCase = new AgregateMemberOfTeamUseCase(service,serviceMember);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('call usecase ', (done) => {
    // Arrange
    const _idTeam = '641c65deff0153dd0f36bf5';
    const _idMember = '641c65deff0153dd0f36bf6';
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
        member: [_idMember],
        task: [""],
        project: "string",
        collaboration: [""],
    };
    const mockMember : MemberDomainEntity = 
    { 

      name: "string",
      document: "string",
      salary: 12,
      role: "string",
  
      email:"string",
      password:"string",
    };
    const expectedData  = 
    {
    
        name: "string",
        member: [_idMember],
        task: [""],
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

    
    const registers : AgregateMemberOfTeamDto= 
    { 
        team: _idTeam,
        member: _idMember,
    };
    const stubFindOneBy = jest.fn(() =>
    new Observable<MemberDomainEntity>((subscriber) => {
      subscriber.next(mockMember);
      subscriber.complete();
        }),
    );
    const stubFindOneByTeam = jest.fn(() =>
    new Observable<TeamDomainEntity>((subscriber) => {
      subscriber.next(mockData);
      subscriber.complete();
        }),
    );

    const getTaskSpy = jest.spyOn(GetMemberUseCase.prototype, 'execute');
    getTaskSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(mockMember);
      subscriber.complete();
    }));

    const getTeamSpy = jest.spyOn(GetTeamUseCase.prototype, 'execute');
    getTeamSpy.mockReturnValue(new Observable((subscriber) => {
      subscriber.next(payload);
      subscriber.complete();
    }));
    jest.spyOn(service, 'update').mockReturnValue(stubUpdate());
    jest.spyOn(service, 'findOneBy').mockReturnValue(stubFindOneByTeam());
    jest.spyOn(serviceMember, 'findOneBy').mockReturnValue(stubFindOneBy());

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
