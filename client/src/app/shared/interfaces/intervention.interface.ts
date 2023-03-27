import { AdresseIntervention } from "./adresse-intervention.interface";
import { Client } from "./client.interface";
import { Horse } from "./horse.interface";
import { Prix } from "./prix.interface";
import { Report } from "./report.interface";

export interface Intervention {
    id?:number;
    title?:string;
    start?:string;
    end?:string;
    horse?:Horse;
    prix?:Prix;
    client?:Client;
    adressePrestation?:AdresseIntervention
    report?:Report;
    paid?:boolean
}