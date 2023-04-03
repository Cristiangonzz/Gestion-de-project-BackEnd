import {  IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CollaborationSchema } from "src/infrastructura/dataBase/schema/collaboration.shema.infrastructura.data-base";

export class CreateCollaborationDto extends CollaborationSchema{
    @ApiProperty()
    @IsString()
    team: string;

    @ApiProperty()
    @IsString()
    performence: string;
    
    @ApiProperty()
    @IsString()
    progress: string;

    @ApiProperty()
    @IsString()
    notification: string;

    @ApiProperty()
    @IsString()
    comment: string;
    
}