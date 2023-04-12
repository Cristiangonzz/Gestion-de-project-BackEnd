import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { lastValueFrom, of } from "rxjs";
import { MemberRepository } from "./member.intrastructura.repositoy.data-base";
import { MemberSchema } from "../schema/member.shema.infrastructura.data-base";
import { MemberDomainEntity } from "src/domain/entities/member.entity.domain";

describe('MemberRepository', () => {
    let memberRepository: MemberRepository;
    let memberModel: Model<MemberSchema>;

    const member : MemberDomainEntity= 
    {
        name: "string",
        document: "string",
        salary: 12,
        role: "string",
    
        email:"string",
        password:"string",
    }

  const mock = 
    {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        document: "string",
        salary: 12,
        role: "string",
    
        email:"string",
        password:"string",
    
    };
  const expected = 
  {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        document: "string",
        salary: 12,
        role: "string",
    
        email:"string",
        password:"string",
    
  };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            MemberRepository,
          {
            provide: getModelToken(MemberSchema.name),
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

      memberRepository = module.get<MemberRepository>(MemberRepository);
      memberModel = module.get<Model<MemberSchema>>(getModelToken(MemberSchema.name));
      
    });
  
    it('should be defined', () => {
      expect(memberRepository).toBeDefined();
      expect(memberModel).toBeDefined();
    });
  

    describe('create', () => {
        it('return member', async () => {
          // Arrange
          
          jest.spyOn(memberModel, 'create').mockResolvedValue(mock as any);
    
          // Act
          const result = memberRepository.register(member);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expected);
        });
      });

   describe('findOneBy', () => {
     it('return member', (done) => {
    // Arrange
       const memberId = "64331da60df2facaa291b6a9";

       jest.spyOn(memberModel, 'findOne').mockReturnValue(mock as any);

    // Act
       const result = memberRepository.findOneBy(memberId);
    
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
    it('return member', (done) => {
   // Arrange
      const memberId = "64331da60df2facaa291b6a9";
      const MemberSchema : MemberSchema= 
        {
            name: "string",
            document: "string",
            salary: 12,
            role: "string",
        
            email:"string",
            password:"string",
        }
      jest.spyOn(memberModel, 'findByIdAndUpdate').mockReturnValue(of(mock) as any);

   // Act
      const result = memberRepository.update(memberId,MemberSchema);
   
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



      const expectedmember: boolean = true;

      jest.spyOn(memberModel, 'findByIdAndDelete').mockReturnValue(of(mock) as any);

      // Act
      const result = memberRepository.delete(_id.toString());

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedmember);
    });
  });

    
  describe('findAll', () => {
    it('return member', (done) => {
   // Arrange
    jest.spyOn(memberModel, 'find').mockReturnValue(of(mock) as any);

   // Act
      const result = memberRepository.findAll();
   
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