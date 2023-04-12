import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { lastValueFrom, of } from "rxjs";
import { TaskRepository } from "./task.intrastructura.repositoy.data-base";
import { TaskSchema } from "../schema/task.shema.infrastructura.data-base";
import { TaskDomainEntity } from "src/domain/entities/task.entity.domain";

describe('TaskRepository', () => {
    let taskRepository: TaskRepository;
    let taskModel: Model<TaskSchema>;

    const task : TaskDomainEntity= 
    {
        name: "string",
        description:"string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    }

  const mock = 
    {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        description:"string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    
    };
  const expected = 
  {
        _id: '641c70d41964e9445f593bcc',
        name: "string",
        description:"string",
        dataExpiration: "string",
        progress: "string",
        priority: "string",
    
  };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            TaskRepository,
          {
            provide: getModelToken(TaskSchema.name),
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

      taskRepository = module.get<TaskRepository>(TaskRepository);
      taskModel = module.get<Model<TaskSchema>>(getModelToken(TaskSchema.name));
      
    });
  
    it('should be defined', () => {
      expect(taskRepository).toBeDefined();
      expect(taskModel).toBeDefined();
    });
  

    describe('create', () => {
        it('return task', async () => {
          // Arrange
          
          jest.spyOn(taskModel, 'create').mockResolvedValue(mock as any);
    
          // Act
          const result = taskRepository.register(task);
    
          // Assert
          expect(await lastValueFrom(result)).toEqual(expected);
        });
      });

   describe('findOneBy', () => {
     it('return task', (done) => {
    // Arrange
       const taskId = "64331da60df2facaa291b6a9";

       jest.spyOn(taskModel, 'findOne').mockReturnValue(mock as any);

    // Act
       const result = taskRepository.findOneBy(taskId);
    
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
    it('return task', (done) => {
   // Arrange
      const taskId = "64331da60df2facaa291b6a9";

      const TaskSchema : TaskSchema= 
        {
            name: "string",
            description:"string",
            dataExpiration: "string",
            progress: "string",
            priority: "string",
        }
      jest.spyOn(taskModel, 'findByIdAndUpdate').mockReturnValue(of(mock) as any);

   // Act
      const result = taskRepository.update(taskId,TaskSchema);
   
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



      const expectedtask: boolean = true;

      jest.spyOn(taskModel, 'findByIdAndDelete').mockReturnValue(of(mock) as any);

      // Act
      const result = taskRepository.delete(_id.toString());

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedtask);
    });
  });

    
  describe('findAll', () => {
    it('return task', (done) => {
   // Arrange
    jest.spyOn(taskModel, 'find').mockReturnValue(of(mock) as any);

   // Act
      const result = taskRepository.findAll();
   
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
