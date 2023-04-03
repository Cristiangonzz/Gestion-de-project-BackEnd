import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class GetEntityDtp{
    @ApiProperty()
    @IsString()
    _id: string;
}