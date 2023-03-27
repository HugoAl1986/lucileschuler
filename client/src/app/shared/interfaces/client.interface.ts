import { Horse } from "./horse.interface";

export interface Client {
    id?:string | number,
    nom:string;
    prenom:string;
    email:string;
    horses?:Array<Horse>;
}