import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { ITeamRepository } from "../../../domain/repositories/team-repository-base.repositoy";
import { TeamSchema, teamDocument } from "../schema/team.shema.infrastructura.data-base";

@Injectable()
export class TeamRepository implements ITeamRepository<TeamSchema>{
    
    constructor(
        @InjectModel(TeamSchema.name) private readonly teamModel: Model<teamDocument>
        ) { }
    
    /**
     * This function takes a TeamSchema object as a parameter, and returns an Observable of type
     * TeamSchema.
     * @param {TeamSchema} team - TeamSchema
     * @returns An Observable of type TeamSchema.
     */
    register(team: TeamSchema): Observable<TeamSchema> {
        return from(this.teamModel.create(team));
    }
    
    
    /**
     * It returns an Observable of type TeamSchema, which is a promise that resolves to a
     * TeamSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a TeamSchema object.
     */
    findOneBy(id: string): Observable<TeamSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.teamModel.findOne(_id)))
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
      * @param {TeamSchema} team - TeamSchema
      * @returns The updated document.
      */
     update(id:string ,team: TeamSchema): Observable<TeamSchema> {
         return from(this.teamModel.findByIdAndUpdate(id, team, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('team not found in the database');
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
        return from(this.teamModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('team not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<TeamSchema[]> {
        return from(this.teamModel.find()) //Como estoy usando lo inyectado y lo tipeo con teamDocument entonces siempre me va a devolver un array de teamDocument
            .pipe(
                map((team: teamDocument[] ) =>  {
                    return team;
                } ));
    }

}

