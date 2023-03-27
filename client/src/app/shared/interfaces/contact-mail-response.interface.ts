import { ContactMail } from "./contactMail.interface";

export interface ContactMailResponse {
    id?:number;
    response?:string;
    createdAt?:string;
    contactMail?:ContactMail;
}