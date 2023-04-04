import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";

import { MemberService } from "../services/member.service";
import { MemberController } from "./member.controller";
import { GetMemberUseCase } from "../../application/use-case/get/get-member.use-case";
import { MemberDomainEntity } from "../../domain/entities/member.entity.domain";
import { RegisterMemberUseCase } from "../../application/use-case/create/register-member.use-case";
import { UpdateMemberUseCase } from "../../application/use-case/update/update-member.use-case";
import { DeleteMemberUseCase } from "../../application/use-case/delete/delete-member.use-case";

describe('MemberController', () => {

  let api: MemberController;
  let service: MemberService;

  const _id = '642b210464e2757b0151ec9b';

  const member: MemberDomainEntity = {
    name: "cris",
    document: "123",
    salary: 12,
    role: "programador",

    email:"cris@gmail.com",
    password: "123cris",
    }

  const mockaMember : MemberDomainEntity = 
  {
      name: "cris",
      document: "123",
      salary: 12,
      role: "programador",
  
      email:"cris@gmail.com",
      password: "123cris",
    };

  const expectedMember : MemberDomainEntity = 
    {

      name: "cris",
      document: "123",
      salary: 12,
      role: "programador",
  
      email:"cris@gmail.com",
      password: "123cris",
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MemberService,
          useValue: {},
        },
      ],
      controllers: [MemberController],
    }).compile();

    api = module.get<MemberController>(MemberController);
    service = module.get<MemberService>(MemberService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('must return a member', async () => {
      // Arrange
     jest
      .spyOn(GetMemberUseCase.prototype, 'execute')
      .mockReturnValue(of(member));

    // Act
    const result = api.getMember(_id);

    // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedMember));
    })
  });

  describe('create', () => {
    it('must return a member', async () => {
      // Arrange
    jest
      .spyOn(RegisterMemberUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaMember));     

    // Act
    const result = api.registerMember(member);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedMember));
      })
      });

   describe('update', () => {
    it('must return a member ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateMemberUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaMember))
  
      // Ac
      const result = api.updateMember(_id,member)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedMember));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const member = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteMemberUseCase.prototype, 'execute')
      .mockReturnValue(of(member));  
   
    // Act  
    const result = api.deleteMember(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
        })
        
  });
});
