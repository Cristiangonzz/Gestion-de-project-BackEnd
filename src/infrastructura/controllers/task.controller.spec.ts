import { Test, TestingModule } from "@nestjs/testing";
import { of ,lastValueFrom} from "rxjs";

import { TaskDomainEntity } from "../../domain/entities/task.entity.domain";
import { TaskController } from "../../infrastructura/controllers/task.controller";
import { TaskService } from "../../infrastructura/services/task.service";
import { DeleteTaskUseCase } from "../../application/use-case/delete/delete-task-.use-case";
import { UpdateTaskUseCase } from "../../application/use-case/update/update-task-.use-case";
import { CreateTaskUseCase } from "../../application/use-case/create/create-task-.use-case";
import { GetTaskUseCase } from "../../application/use-case/get/get-task-.use-case";

describe('TaskController', () => {

  let api: TaskController;
  let service: TaskService;
  const _id = '642b210464e2757b0151ec9b';

  const Task: TaskDomainEntity = 
    {
        name: "tarea 1",
        description: "hacer las pruebas unitarias",
        dataExpiration: "20/10/2024",
        progress: "avanzado",
        priority: "alta"
    }

    const mockaTask : TaskDomainEntity = 
    {
        name: "tarea 1",
        description: "hacer las pruebas unitarias",
        dataExpiration: "20/10/2024",
        progress: "avanzado",
        priority: "alta"
    };

  const expectedTask : TaskDomainEntity = 
    {

        name: "tarea 1",
        description: "hacer las pruebas unitarias",
        dataExpiration: "20/10/2024",
        progress: "avanzado",
        priority: "alta"
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useValue: {},
        },
      ],
      controllers: [TaskController],
    }).compile();

    api = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });


  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get', () => {
    it('must return a Task', async () => {
      // Arrange
     jest
      .spyOn(GetTaskUseCase.prototype, 'execute')
      .mockReturnValue(of(Task));

    // Act
    const result = api.getTask(_id);

    // Assert
    expect(await lastValueFrom(result)).toEqual((expectedTask));
    })
  });

  describe('create', () => {
    it('must return a Task', async () => {
      // Arrange
    jest
      .spyOn(CreateTaskUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTask));     

    // Act
    const result = api.createTask(Task);      // Assert
    expect(await lastValueFrom(result) ).toEqual((expectedTask));
      })
      });

   describe('update', () => {
    it('must return a member ', async () => {
      // Arrange
      
      jest
      .spyOn(UpdateTaskUseCase.prototype, 'execute')
      .mockReturnValue(of(mockaTask))
  
      // Ac
      const result = api.updateTask(_id,Task)
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expectedTask));

      })
   
 
    describe('delete', () => {
      it('must return a true', async () => {
        // Arrange
      const Task = true;  
     
      const expected = true;  
  
      jest
      .spyOn(DeleteTaskUseCase.prototype, 'execute')
      .mockReturnValue(of(Task));  
   
    // Act  
    const result = api.deleteTask(_id);
      // Assert
      expect(await lastValueFrom(result) ).toEqual((expected));
        })
        })
        
  });
});
