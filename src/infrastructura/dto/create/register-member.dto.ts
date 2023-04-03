import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MemberSchema } from "src/infrastructura/dataBase/schema/member.shema.infrastructura.data-base";

export class RegisterMemberDto extends MemberSchema{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    document: string;

    @ApiProperty()
    @IsString()
    salary: number;
    
    @ApiProperty()
    @IsString()
    role: string;
}