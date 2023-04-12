import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TeamSchema } from "../../../infrastructura/dataBase/schema/team.shema.infrastructura.data-base";

export class RegisterTeamDto extends TeamSchema{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    project: string;
}
