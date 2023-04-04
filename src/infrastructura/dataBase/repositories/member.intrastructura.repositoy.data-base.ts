import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Observable, catchError, from, map } from "rxjs";

import { Model, Types } from "mongoose";
import { IMemberRepository } from "../../../domain/repositories/member-repository-base.repositoy";
import { MemberSchema, memberDocument } from "../schema/member.shema.infrastructura.data-base";

@Injectable()
export class MemberRepository implements IMemberRepository<MemberSchema>{
    
    constructor(
        @InjectModel(MemberSchema.name) private readonly memberModel: Model<memberDocument>
        ) { }
    
    /**
     * This function takes a memberSchema object as a parameter, and returns an Observable of type
     * memberSchema.
     * @param {MemberSchema} member - MemberSchema
     * @returns An Observable of type MemberSchema.
     */
    register(member: MemberSchema): Observable<MemberSchema> {
        return from(this.memberModel.create(member));
    }
    
    
    /**
     * It returns an Observable of type MemberSchema, which is a promise that resolves to a
     * MemberSchema object.
     * @param {string} id - string - The id of the document to find.
     * @returns A promise of a MemberSchema object.
     */
    findOneBy(id: string): Observable<MemberSchema> {
        const _id = new Types.ObjectId(id);
        return from(Promise.resolve(this.memberModel.findOne(_id)))
            .pipe(
                catchError((err:Error) => {
                    throw new Error(err.message);
                }
            ));
    }
    findOneByEmail(id: string): Observable<MemberSchema> {
        return from(Promise.resolve(this.memberModel.findOne({email: id})))
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
      * @param {MemberSchema} member - MemberSchema
      * @returns The updated document.
      */
     update(id:string ,member: MemberSchema): Observable<MemberSchema> {
         return from(this.memberModel.findByIdAndUpdate(id, member, {new: true}))
             .pipe(
                  catchError((err : Error) => {
                  throw new Error('member not found in the database');
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
        return from(this.memberModel.findByIdAndDelete(_id)).pipe(
        catchError((error : Error ) => {
            throw error;
        }),
        map((usuario) => {
            if (!usuario) throw new NotFoundException('member not found in the database');
            return true;
        }),
        );
    }

    findAll(): Observable<MemberSchema[]> {
        return from(this.memberModel.find()) //Como estoy usando lo inyectado y lo tipeo con memberDocument entonces siempre me va a devolver un array de memberDocument
            .pipe(
                map((member: memberDocument[] ) =>  {
                    return member;
                } ));
    }

}

