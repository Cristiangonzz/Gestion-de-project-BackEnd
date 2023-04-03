import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { TaskSchema, taskDocument } from "../schema/task.shema.infrastructura.data-base";
import { ITaskRepository } from "src/domain/repositories/task-repository-base.repositoy";

@Injectable()
export class TaskRepository implements ITaskRepository<TaskSchema>{
    
    constructor(
        @InjectModel(TaskSchema.name) private readonly taskModel: Model<taskDocument>
        ) { }
    
    /**
     * This function takes a TaskSchema object as a parameter, and returns an Observable of type
     * TaskSchema.
     * @param {TaskSchema} task - TaskSchema
     * @returns An Observable of type TaskSchema.
     */
    register(task: TaskSchema): Observable<TaskSchema> {
        return from(this.taskModel.create(task));
    }
    
    
    /**
     * It returns an Observable of type TaskSchema, which is a promise that resolves to a
     * TaskSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a TaskSchema object.
     */
    findOneBy(id: string): Observable<TaskSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.taskModel.findOne(_id)))
            .pipe(
                catchError((err:Error) => {
                    throw new Error(err.message);
                }
            ));
    }

     /**
      * This function takes an id and a person object and returns an observable of the updated person
      * object.
      * @param {string} id - The id of the document to update.
      * @param {TaskSchema} task - TaskSchema
      * @returns The updated document.
      */
     update(id:string ,task: TaskSchema): Observable<TaskSchema> {
         return from(this.taskModel.findByIdAndUpdate(id, task, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('task not found in the database');
                  })
     );
     }

    /**
     * It deletes a document from the database and returns a boolean value.
     * @param {string} id - string
     * @returns The return is a boolean value.
     */
    delete(id: string): Observable<boolean> {
        const _id = new Types.ObjectId(id);
        return from(this.taskModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('task not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<TaskSchema[]> {
        return from(this.taskModel.find()) //Como estoy usando lo inyectado y lo tipeo con taskDocument entonces siempre me va a devolver un array de taskDocument
            .pipe(
                map((task: taskDocument[] ) =>  {
                    return task;
                } ));
    }

}

