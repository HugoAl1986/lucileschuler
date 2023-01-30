<?php

namespace App\Services;

use App\Entity\Client;
use App\Repository\ClientRepository;
use App\Utils\Functions;
use Doctrine\Persistence\ManagerRegistry;


class ClientService
{

    public function __construct(private ManagerRegistry $managerRegistry, private ClientRepository $rep, private Functions $f)
    {
    }


    public function saveClient(Client $client): array
    {
        $em = $this->managerRegistry->getManager();
        $em->persist($client);

        $clientInDB = $this->rep->findBy(["email" => $client->getEmail()]);

        if ($clientInDB) {
            return ["content" => "le client" . $client->getEmail() . " existe déjà en DB !", "status_code" => 400];
        }

        try {
            $em->flush();
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, 'Erreur lors de la création dans la DB');
        }

        return ["content" => $client, "status_code" => 201];
    }

    public function getClients(): array
    {
        try {
            $clients = $this->rep->findBy([], ["nom" => "ASC"]);
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, 'Erreur lors de la récupération des données');
        }

        return ["content" => $clients, "status_code" => 200];
    }

    public function updateClient(Client $client, int $id): array
    {

        $clientFromDB = $this->rep->find($id);

        if (!$clientFromDB) {
            return ["content" => "l'id " . $id . " n'existe pas en DB !!", "status_code" => 400];
        }

        $clientFromDB->setEmail($client->getEmail())
            ->setNom($client->getNom())
            ->setPrenom($client->getPrenom());
        $clientFromDB->setNom($client->getNom());

        $em = $this->managerRegistry->getManager();

        try {
            $em->flush();
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, 'Erreur lors de la modification du client');
        }

        return ["content" => $clientFromDB, "status_code" => 200];
    }

    public function removeClient($id): array
    {
        $client = $this->rep->find($id);

        if (!$client) {
            return ["content" => "le client n'existe pas en DB !!", "status_code" => 404];
        }

        try {
            $this->rep->remove($client, true);
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, 'Une erreur est survenue lors de la suppression du client');
        }

        return ["content" => "le client " . $client->getEmail() . " a bien été supprimé !", "status_code" => 200];
    }
}
