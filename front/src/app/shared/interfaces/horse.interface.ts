import { Client } from "./client.interface";

export interface Horse {
    id?:string
    nom:string;
    age?:string | number;
    client?:Client
    prestations?:Array<any>
}