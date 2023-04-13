import { IMemberDomainService } from "src/domain/services/member.service.domain";
import { SignInMemberUseCase } from "./sign-in.use-case";
import { MemberDomainEntity } from "src/domain/entities/member.entity.domain";
import { SignInDto } from "src/infrastructura/dto/sign-in/sign-in.dto";
import { Observable } from "rxjs";



describe('SignInMemberUseCase', () => {
  let useCase: SignInMemberUseCase;
  let service: IMemberDomainService<MemberDomainEntity>;

  beforeEach(() => {
    service = {
      findOneByEmail: jest.fn(),
    } as any as  IMemberDomainService<MemberDomainEntity>;
    useCase = new SignInMemberUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('verificar que se llame al servicio',() => {

    const mockData: MemberDomainEntity = {
      name: "string",
      document: "string",
      salary: 1,
      role: "string",
  
      email:'email@gmail.com',
      password:"string",
    };
    const stubSignIn = jest.fn(() =>
    new Observable<MemberDomainEntity>((subscriber) => {
      subscriber.next(mockData);
      subscriber.complete();
    }),
    );
    const expectedInstanceType = Observable<string>;
   const signIn : SignInDto = {
      email: 'email@gmail.com',
      password: 'password',
    };
    jest.spyOn(service, 'findOneByEmail').mockReturnValue(stubSignIn());

    const result = useCase.execute(signIn);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
      },
    });

  });
  

});

