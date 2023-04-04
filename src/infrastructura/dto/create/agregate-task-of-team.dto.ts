import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AgregateTaskOfTeamDto{
    
    @ApiProperty()
    @IsString()
    team: string;

    @ApiProperty()
    @IsString()
    task: string;
}
