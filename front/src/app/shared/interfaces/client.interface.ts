import { Horse } from "./horse.interface";

export interface Client {
    id?:string,
    nom:string;
    prenom:string;
    email:string;
    horses?:Array<Horse>;
}