import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MemberDomainEntity } from '../../../domain/entities/member.entity.domain';
import { ApiProperty } from '@nestjs/swagger';


@Schema({collection: 'Member',versionKey: false})
/* A class that represents a person. */
export class MemberSchema extends MemberDomainEntity {
  @Prop({
      type: String,
      index: true,
      required: true,
  })
  @ApiProperty()
  name: string;

  @Prop({
      type: String,
      index: true,
      required: true,
    })
    @ApiProperty()
    document: string;

    @Prop({
        type: Number,
        index: true,
        required: true,
      })
      @ApiProperty()
      salary: number;
    
    @Prop({
        type: String,
        index: true,
    })
    @ApiProperty()
    role: string;

    @Prop({
      type: String,
      index: true,
      required: true,
      unique:true,
    })
    @ApiProperty()
    email: string;
  
  @Prop({
      type: String,
      index: true,
      required:true,
  })
  @ApiProperty()
  password: string;

  

}

/**
 * define la forma en que los documentos deben ser organizados dentro de una colección.
 * hidrata el esquema ya definido de nodejs y mongoose para que sea como un documento de mongoDB
 */
export type memberDocument = HydratedDocument<MemberSchema>;

/* Creating a schema factory for the memberSchema class. */
export const memberSchemaFactory = SchemaFactory.createForClass(MemberSchema);