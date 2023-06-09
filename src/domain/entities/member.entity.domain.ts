import { IMemberDomainModel } from "../interfaces/member.interface.domain";

export class MemberDomainEntity implements IMemberDomainModel {
    name: string;
    document: string;
    salary: number;
    role: string;

    email:string;
    password:string;
}

export class MemberDomainEntityMongo implements IMemberDomainModel {
    _id: string;
    name: string;
    document: string;
    salary: number;
    role: string;

    email:string;
    password:string;
}
