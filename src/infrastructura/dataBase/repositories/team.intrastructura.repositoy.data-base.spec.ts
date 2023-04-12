import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { lastValueFrom, of } from "rxjs";
import { TeamRepository } from "./team.intrastructura.repositoy.data-base";
import { TeamSchema } from "../schema/team.shema.infrastructura.data-base";
import { TeamDomainEntity } from "src/domain/entities/team.entity.domain";

describe('TeamRepository', () => {
    let teamRepository: TeamRepository;
    let teamModel: Model<TeamSchema>;

    const team : TeamDomainEntity= 
    {
        name: "string",
        member: ["string"],
        task: ["string"],
        project: "string",
        collaboration: ["string"],
    }

  const mock = 
    {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        member: ["string"],
        task: ["string"],
        project: "string",
        collaboration: ["string"],
    
    };
  const expected = 
  {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        member: ["string"],
        task: ["string"],
        project: "string",
        collaboration: ["string"],
    
  };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            TeamRepository,
          {
            provide: getModelToken(TeamSchema.name),
            useValue: {
                create: jest.fn(),
                findOne: jest.fn(),
                findByIdAndUpdate: jest.fn(),
                findByIdAndDelete: jest.fn(),
                find: jest.fn(),
            },
          },
        ],
      }).compile();

      teamRepository = module.get<TeamRepository>(TeamRepository);
      teamModel = module.get<Model<TeamSchema>>(getModelToken(TeamSchema.name));
      
    });
  
    it('should be defined', () => {
      expect(teamRepository).toBeDefined();
      expect(teamModel).toBeDefined();
    });
  

    describe('create', () => {
        it('return team', async () => {
          // Arrange
          
          jest.spyOn(teamModel, 'create').mockResolvedValue(mock as any);
    
          // Act
          const result = teamRepository.register(team);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expected);
        });
      });

   describe('findOneBy', () => {
     it('return team', (done) => {
    // Arrange
       const teamId = "64331da60df2facaa291b6a9";

       jest.spyOn(teamModel, 'findOne').mockReturnValue(mock as any);

    // Act
       const result = teamRepository.findOneBy(teamId);
    
    // Assert
       result.subscribe({
         next: (result) =>  expect(result).toEqual(expected),
         complete: () => {
           done();
         },
       });
     });
   })
   describe('update', () => {
    it('return team', (done) => {
   // Arrange
      const teamId = "64331da60df2facaa291b6a9";

      const TeamSchema : TeamSchema= 
        {
            name: "string",
            member: ["string"],
            task: ["string"],
            project: "string",
            collaboration: ["string"],
        }
      jest.spyOn(teamModel, 'findByIdAndUpdate').mockReturnValue(of(mock) as any);

   // Act
      const result = teamRepository.update(teamId,TeamSchema);
   
   // Assert
      result.subscribe({
        next: (result) =>  expect(result).toEqual(expected),
        complete: () => {
          done();
        },
      });
    });
  })


  describe('delete', () => {
    it('return  true', async () => {
      // Arrange
      const _id = new Types.ObjectId("641f1e79398d97022720784b");



      const expectedteam: boolean = true;

      jest.spyOn(teamModel, 'findByIdAndDelete').mockReturnValue(of(mock) as any);

      // Act
      const result = teamRepository.delete(_id.toString());

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedteam);
    });
  });

    
  describe('findAll', () => {
    it('return team', (done) => {
   // Arrange
    jest.spyOn(teamModel, 'find').mockReturnValue(of(mock) as any);

   // Act
      const result = teamRepository.findAll();
   
   // Assert
      result.subscribe({
        next: (result) =>  expect(result).toEqual(expected),
        complete: () => {
          done();
        },
      });
    });
    })
  });
