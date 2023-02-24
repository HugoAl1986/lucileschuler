import { Client } from "./client.interface";
import { Horse } from "./horse.interface";

export interface Intervention {
    title?:string;
    start:Date;
    end:Date;
    horse:Horse;
    prix:string;
    client?:Client
}