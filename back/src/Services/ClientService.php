<?php

namespace App\Services;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\Persistence\ManagerRegistry;


class ClientService {

public function __construct(private ManagerRegistry $managerRegistry, private ClientRepository $rep){

}

public function messageErreur(\Exception $e, $message) : array{
    return ["content" => $message . ' : ' . $e -> getMessage(),  "status_code" => 400];
}

public function saveClient(Client $client) : array{
    $em = $this -> managerRegistry -> getManager();
    $em -> persist($client);

    try {
        $em -> flush();
    } catch (\Exception $e){
        return $this -> messageErreur($e, 'Erreur lors de la création dans la DB');
    }

    return ["content" => $client, "status_code" => 201];

}

public function getClients() : array{
    try {
        $clients = $this -> rep ->findBy([], ["nom" => "ASC"]);
    } catch (\Exception $e) {
        return $this -> messageErreur($e, 'Erreur lors de la récupération des données');
    }

    return ["content" => $clients, "status_code" => 200];
}

public function editClient(Client $client, int $id) : array{

    $clientFromDB = $this -> rep -> find($id);

    if(!$clientFromDB){
       return ["content" => "l'id " . $id . " n'existe pas en DB !!", "status_code" => 400];
    }
    
    $clientFromDB -> setEmail($client -> getEmail()) 
                  -> setNom($client -> getNom())
                  -> setPrenom($client -> getPrenom());
    $clientFromDB -> setNom($client -> getNom());

    $em = $this -> managerRegistry -> getManager();

    try {
        $em -> flush();
    } catch (\Exception $e){
        return $this -> messageErreur($e, 'Erreur lors de la modification du client');
    }

    return ["content" => $clientFromDB, "status_code" => 200];

}
}