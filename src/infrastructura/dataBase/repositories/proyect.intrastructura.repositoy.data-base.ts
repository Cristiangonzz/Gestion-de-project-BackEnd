import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { IProyectRepository } from "../../../domain/repositories/proyect-repository-base.repositoy";
import { ProyectSchema, proyectDocument } from "../schema/proyect.shema.infrastructura.data-base";

@Injectable()
export class ProyectRepository implements IProyectRepository<ProyectSchema>{
    
    constructor(
        @InjectModel(ProyectSchema.name) private readonly proyectModel: Model<proyectDocument>
        ) { }
    
    /**
     * This function takes a ProyectSchema object as a parameter, and returns an Observable of type
     * ProyectSchema.
     * @param {ProyectSchema} proyect - ProyectSchema
     * @returns An Observable of type ProyectSchema.
     */
    register(proyect: ProyectSchema): Observable<ProyectSchema> {
        return from(this.proyectModel.create(proyect));
    }
    
    
    /**
     * It returns an Observable of type ProyectSchema, which is a promise that resolves to a
     * ProyectSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a ProyectSchema object.
     */
    findOneBy(id: string): Observable<ProyectSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.proyectModel.findOne(_id)))
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
      * @param {ProyectSchema} proyect - ProyectSchema
      * @returns The updated document.
      */
     update(id:string ,proyect: ProyectSchema): Observable<ProyectSchema> {
         return from(this.proyectModel.findByIdAndUpdate(id, proyect, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('proyect not found in the database');
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
        return from(this.proyectModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('proyect not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<ProyectSchema[]> {
        return from(this.proyectModel.find()) //Como estoy usando lo inyectado y lo tipeo con proyectDocument entonces siempre me va a devolver un array de proyectDocument
            .pipe(
                map((proyect: proyectDocument[] ) =>  {
                    return proyect;
                } ));
    }

}

