import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { ICollaborationRepository } from "../../../domain/repositories/collaboration-repository-base.repositoy";
import { CollaborationSchema, collaborationDocument } from "../schema/collaboration.shema.infrastructura.data-base";

@Injectable()
export class CollaborationRepository implements ICollaborationRepository<CollaborationSchema>{
    
    constructor(
        @InjectModel(CollaborationSchema.name) private readonly collaborationModel: Model<collaborationDocument>
        ) { }
    
    /**
     * This function takes a CollaborationSchema object as a parameter, and returns an Observable of type
     * CollaborationSchema.
     * @param {CollaborationSchema} collaboration - CollaborationSchema
     * @returns An Observable of type CollaborationSchema.
     */
    register(collaboration: CollaborationSchema): Observable<CollaborationSchema> {
        return from(this.collaborationModel.create(collaboration));
    }
    
    
    /**
     * It returns an Observable of type CollaborationSchema, which is a promise that resolves to a
     * CollaborationSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a CollaborationSchema object.
     */
    findOneBy(id: string): Observable<CollaborationSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.collaborationModel.findOne(_id)))
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
      * @param {CollaborationSchema} collaboration - CollaborationSchema
      * @returns The updated document.
      */
     update(id:string ,collaboration: CollaborationSchema): Observable<CollaborationSchema> {
         return from(this.collaborationModel.findByIdAndUpdate(id, collaboration, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('collaboration not found in the database');
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
        return from(this.collaborationModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('collaboration not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<CollaborationSchema[]> {
        return from(this.collaborationModel.find()) //Como estoy usando lo inyectado y lo tipeo con collaborationDocument entonces siempre me va a devolver un array de collaborationDocument
            .pipe(
                map((collaboration: collaborationDocument[] ) =>  {
                    return collaboration;
                } ));
    }

}

