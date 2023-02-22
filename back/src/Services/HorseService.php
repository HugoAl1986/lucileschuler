<?php

namespace App\Services;

use App\Entity\Horse;
use App\Repository\HorseRepository;
use App\Repository\ClientRepository;
use App\Utils\Functions;
use Doctrine\Persistence\ManagerRegistry;

class HorseService
{

    public function __construct(
        private HorseRepository $horseRepository,
        private ManagerRegistry $managerRegistry,
        private Functions $f,
        private ClientRepository $clientRepository
    ) {
    }

    public function getHorses():array{
        try {
            $horses = $this->horseRepository->findBy([], ["nom" => "ASC"]);  
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, 'Erreur lors de la récupération des données');
        }

        return ["content" => $horses, "status_code" => 200];
        
    }

    public function saveHorse(Horse $horse, int $id): array
    {
        $em = $this->managerRegistry->getManager();

        $client = $this->clientRepository->find($id);
        if (!$client) {
            return ["content" => "Le client n'existe pas en DB !!", "status_code" => 404];
        }

        $existingHorse = $client->getHorses()->exists(function ($int, $value) use ($horse) {
            return $value->getNom() == $horse->getNom();
        });
        if ($existingHorse) {
            return ["content" => "Erreur ! Le horse " . $horse->getNom() . " existe déja pour cette cliente !", "status_code" => 400];
        }

        $horse->setClient($client);

        try {

            $em->persist($horse);
            $em->flush();
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, "Une erreur est survenue lors de l'enregistrement en bdd !");
        }

        return ["content" => $horse, "status_code" => 201];
    }

    public function updateHorse(Horse $horse, int $id): array
    {
        $em = $this->managerRegistry->getManager();
        $horseFromDB = $this->horseRepository->find($id);

        if (!$horse) {
            return ["content" => "le horse n'existe pas en DB !", "status_code" => 400];
        }

        $horseFromDB->setAge($horse->getAge())
            ->setNom($horse->getNom());

        try {
            $em->flush();
        } catch (\Exception $e) {
            return $this->f->messageErreur($e, "Erreur lors de la modification du horse ! ");
        }

        return ["content" => "le horse a bien été modifié !", "status_code" => 200];
    }
}
