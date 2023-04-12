import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { IProjectRepository } from "../../../domain/repositories/project-repository-base.repositoy";
import { ProjectSchema, ProjectDocument } from "../schema/project.shema.infrastructura.data-base";

@Injectable()
export class ProjectRepository implements IProjectRepository<ProjectSchema>{
    
    constructor(
        @InjectModel(ProjectSchema.name) private readonly projectModel: Model<ProjectDocument>
        ) { }
    
    /**
     * This function takes a ProjectSchema object as a parameter, and returns an Observable of type
     * ProjectSchema.
     * @param {ProjectSchema} project - ProjectSchema
     * @returns An Observable of type ProjectSchema.
     */
    register(project: ProjectSchema): Observable<ProjectSchema> {
        return from(this.projectModel.create(project));
    }
    
    
    /**
     * It returns an Observable of type ProjectSchema, which is a promise that resolves to a
     * ProjectSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a ProjectSchema object.
     */
    findOneBy(id: string): Observable<ProjectSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.projectModel.findOne(_id)))
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
      * @param {ProjectSchema} project - ProjectSchema
      * @returns The updated document.
      */
     update(id:string ,project: ProjectSchema): Observable<ProjectSchema> {
         return from(this.projectModel.findByIdAndUpdate(id, project, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('project not found in the database');
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
        return from(this.projectModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('project not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<ProjectSchema[]> {
        return from(this.projectModel.find()) //Como estoy usando lo inyectado y lo tipeo con projectDocument entonces siempre me va a devolver un array de projectDocument
            .pipe(
                map((project: ProjectDocument[] ) =>  {
                    return project;
                } ));
    }

}

