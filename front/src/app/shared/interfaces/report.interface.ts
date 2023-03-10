import { Intervention } from "./intervention.interface";

export interface Report{
    id?:number,
    number?:number,
    url?:string,
    createdAt?:string,
    intervention?:Intervention
}