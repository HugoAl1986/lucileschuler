<?php

namespace App\Services;

use App\Entity\Cheval;
use App\Repository\ChevalRepository;
use App\Repository\ClientRepository;
use App\Utils\Functions;
use Doctrine\Persistence\ManagerRegistry;

class ChevalService {

    public function __construct(
        private ChevalRepository $chevalRepository, 
        private ManagerRegistry $managerRegistry, 
        private Functions $f, 
        private ClientRepository $clientRepository )
    {

    }

    public function saveCheval(Cheval $cheval, int $id) : array
    {
        $em = $this -> managerRegistry ->getManager();

        $client = $this -> clientRepository -> find($id);
        if(!$client){
            return ["content" => "Le client n'existe pas en DB !!", "status_code" => 404];
        }

        $existingCheval = $client -> getChevals() -> exists(function($int,$value) use ($cheval){
            return $value -> getNom() == $cheval -> getNom();
        });   
        if($existingCheval){
            return ["content" => "Erreur ! Le cheval " . $cheval -> getNom() . " existe déja pour cette cliente !", "status_code" => 400];
        }
          
        $cheval ->setClient($client);
        
        try{

            $em -> persist($cheval);
            $em -> flush();

        } catch(\Exception $e){
            return $this -> f -> messageErreur($e, "Une erreur est survenue lors de l'enregistrement en bdd !");
        }

        return ["content" => "le cheval ". $cheval ->getNom(). " a bien été crée !", "status_code" => 201 ];
    }

    public function updateCheval(Cheval $cheval, int $id) : array 
    {
        $em = $this ->managerRegistry->getManager();
        $chevalFromDB = $this -> chevalRepository -> find($id);

        if(!$cheval){
            return ["content" => "le cheval n'existe pas en DB !", "status_code" => 400];
        }

        $chevalFromDB -> setAge($cheval -> getAge())
                      -> setNom($cheval -> getNom());
        
        try {
            $em -> flush();
        } catch(\Exception $e){
            return $this -> f -> messageErreur($e, "Erreur lors de la modification du cheval ! ");
        }

        return ["content" => "le cheval a bien été modifié !", "status_code" => 200 ];
    }
}