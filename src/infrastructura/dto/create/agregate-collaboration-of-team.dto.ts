import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AgregateCollaborationOfTeamDto{
    
    @ApiProperty()
    @IsString()
    team: string;

    @ApiProperty()
    @IsString()
    collaboration: string;
}
