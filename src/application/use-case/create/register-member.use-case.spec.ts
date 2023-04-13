import { MemberDomainEntity } from "src/domain/entities/member.entity.domain";
import { RegisterMemberUseCase } from "./register-member.use-case";
import { IMemberDomainService } from "src/domain/services/member.service.domain";
import { Observable } from "rxjs";

describe('RegisterMemberUseCase', () => {
  let useCase: RegisterMemberUseCase;
  let service: IMemberDomainService<MemberDomainEntity>;

  beforeEach(() => {
    service = {
        register: jest.fn(),
    } as any as  IMemberDomainService<MemberDomainEntity>;
    useCase = new RegisterMemberUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.registrar', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload: MemberDomainEntity = 
    { 
        name: "string",
        document: "string",
        salary: 0,
        role: "string",
        email: "string",
        password: "string",
    };
    const mockData: MemberDomainEntity = 
    { 
        name: "string",
        document: "string",
        salary: 0,
        role: "string",
        email: "string",
        password: "string",
    };
    const expectedData : MemberDomainEntity = 
    {
        name: "string",
        document: "string",
        salary: 0,
        role: "string",
        email: "string",
        password: "string",
    };
    const expectedInstanceType = Observable<MemberDomainEntity>;
    const stubRegistrar = jest.fn(() =>
        new Observable<MemberDomainEntity>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(service, 'register').mockReturnValue(stubRegistrar());

    // Act
    const result = useCase.execute(payload);

    // Assert
    expect(service.register).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
      },
      complete: () => done(),
    });
  });
});
