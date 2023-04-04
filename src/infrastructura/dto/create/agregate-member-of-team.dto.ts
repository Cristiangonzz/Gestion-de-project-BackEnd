import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AgregateMemberOfTeamDto{
    
    @ApiProperty()
    @IsString()
    team: string;

    @ApiProperty()
    @IsString()
    member: string;
}
