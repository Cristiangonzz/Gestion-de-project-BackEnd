import { Observable } from 'rxjs';
import { CreateCollaborationUseCase } from './create-collaboration-.use-case';
import { CollaborationDomainEntity } from 'src/domain/entities/collaboration.entity.domain';
import { ICollaborationDomainService } from 'src/domain/services/collaboration.service.domain';

describe('CreateCollaborationUseCase', () => {
  let useCase: CreateCollaborationUseCase;
  let service: ICollaborationDomainService<CollaborationDomainEntity>;

  beforeEach(() => {
    service = {
        register: jest.fn(),
    } as any as  ICollaborationDomainService<CollaborationDomainEntity>;
    useCase = new CreateCollaborationUseCase(service);
  });

  it('verificar que se defina', () => {
    expect(useCase).toBeDefined();
  });

  it('llamar a service.registrar', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
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
    const expectedInstanceType = Observable<CollaborationDomainEntity>;
    const stubRegistrar = jest.fn(() =>
        new Observable<CollaborationDomainEntity>((subscriber) => {
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
