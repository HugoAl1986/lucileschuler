import { Client } from "./client.interface";

export interface Horse {
    nom:string;
    age?:string | number;
    client?:Array<Client>
    prestations?:Array<any>
}