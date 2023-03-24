import { ContactMailResponse } from "./contact-mail-response.interface";

export interface ContactMail {
    id?:number;
    email?:string;
    titre?:string;
    message?:string;
    messageLu?:boolean;
    nom?:string;
    prenom?:string;
    date?:string;
    contactMailResponse?:any
}