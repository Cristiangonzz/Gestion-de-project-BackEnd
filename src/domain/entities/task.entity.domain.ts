import { ITaskDomainModel } from "../interfaces/task.entity.domain";

export class TaskDomainEntity implements ITaskDomainModel {
    name: string;
    description: string;
    dataExpiration: string;
    progress: string;
    priority: string;
}

export class TaskDomainEntityMongo implements ITaskDomainModel {
    _id: string;
    name: string;
    description: string;
    dataExpiration: string;
    progress: string;
    priority: string;
}