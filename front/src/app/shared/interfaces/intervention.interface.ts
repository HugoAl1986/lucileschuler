import { AdresseIntervention } from "./adresse-intervention.interface";
import { Client } from "./client.interface";
import { Horse } from "./horse.interface";

export interface Intervention {
    id?:string | number
    title?:string;
    start?:string;
    end?:string;
    horse?:Horse;
    prix?:string;
    client?:Client;
    adressePrestation?:AdresseIntervention
}