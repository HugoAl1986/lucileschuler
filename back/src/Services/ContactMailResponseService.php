<?php

namespace App\Services;

use App\Entity\ContactMail;
use App\Entity\ContactMailResponse;
use App\Repository\ContactMailRepository;
use App\Repository\ContactMailResponseRepository;
use DateTimeImmutable;
use DateTimeZone;

class ContactMailResponseService {
    public function __construct(private ContactMailResponseRepository $contactMailResponseRepository, private ContactMailRepository $contactMailRepository ){

    }

    public function sendResponse(int $id_contact_mail, ContactMailResponse $contactMailResponse) : array{
        $contactMail = $this->contactMailRepository->find($id_contact_mail);

        if(empty($contactMail)){
            return ["content" => "l'id de ce contact n'existe pas", "status_code" => 404];
        }

        $contactMailResponse->setContactMail($contactMail);
        $contactMailResponse->setObject('Re: ' .$contactMail->getTitre());
        $contactMailResponse->setCreatedAt(new \DateTimeImmutable('now',new \DateTimeZone("Europe/Paris")));

        $contactMail->setMessageLu(true);
        try{
            $this->contactMailResponseRepository->save($contactMailResponse, true);
            $this->contactMailRepository->save($contactMail,true);
        }catch(\Exception $e){
            return ["content" => "Une erreur est survenue lors de l'enregistrement en base " .$e->getMessage(), "status_code" => 500];
        }  
        return["content" => $contactMailResponse, "status_code" => 201];

    }

    public function getContactMailResponse() :array {
        try{
            $arrayResponse = $this->contactMailResponseRepository->findAll();
        }catch(\Exception $e){
            return ["content" => "Une erreur est survenue lors de la récupération des données " .$e->getMessage(), "status_code" => 500];
        }

        return ["content" => $arrayResponse,"status_code" => 200];
        
    }
}