<?php

namespace App\Services;

use App\Entity\Prestation;
use App\Repository\HorseRepository;
use App\Repository\PrestationRepository;
use App\Repository\PrixRepository;
use App\Utils\Functions;

class PrestationService
{

    public function __construct(private PrestationRepository $prestationRepository, private Functions $functions, private HorseRepository $horseRepository, private PrixRepository $prixRepository)
    {
    }

    public function createPrestation(Prestation $prestation, int $id_horse, int $id_prix)
    {

        $horse = $this->horseRepository->find($id_horse);

        if (!$horse) {
            return ["content" => "le cheval n'existe pas en base !", "status_code" => 404];
        }

        $prix = $this->prixRepository->find($id_prix);
        if (!$prix) {
            return ["content" => "ce prix n'existe pas en base !", "status_code" => 404];
        }
        $prestation->setHorse($horse)
                   ->setPrix($prix);

        $startPrestationFromDB = $this->prestationRepository->findBy(['start' => $prestation->getStart()]);
        $endPrestationFromDB = $this->prestationRepository->findBy(['end' => $prestation->getEnd()]);

        if(!empty($startPrestationFromDB) || !empty($endPrestationFromDB)){
            return ['content' => 'une prestation existe déja dans ce créneau horaire', "status_code" => 400];
        };
        try {
            $this->prestationRepository->save($prestation, true);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, "Erreur lors de l'enregistrement en base !");
        }

        return ["content" => $prestation, "status_code" => 201];
    }

    public function updatePrestation(Prestation $prestation, int $id_horse, int $id_prix, int $id_prestation)
    {
        $prestationFromDB = $this->prestationRepository->find($id_prestation);
        if (!$prestation) {
            return ["content" => "la prestation n'existe pas !", "status_code" => 404];
        }

        $horse = $this->horseRepository->find($id_horse);
        if (!$horse) {
            return ["content" => "le horse n'existe pas !", "status_code" => 404];
        }
        $prix = $this->prixRepository->find($id_prix);
        if (!$prix) {
            return ["content" => "le prix n'existe pas !", "status_code" => 404];
        }

        $prestationFromDB->setStart($prestation->getStart())
                         ->setEnd($prestation->getEnd())
                         ->setHorse($horse)
                         ->setPrix($prix);

        try {
            $this->prestationRepository->save($prestationFromDB, true);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, "Erreur lors de l'enregistrement en base !");
        }

        return ["content" => "la prestation a bien été modifié", "status_code" => 200];
    }

    public function getPrestations(): array
    {
        try {
            $prestations = $this->prestationRepository->findBy([], ["start" => 'ASC']);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, 'Erreur lors de la récupération des données');
        } 

        return ["content" => $prestations, "status_code" => 200];
    }

    public function removePrestation($id_prestation): array
    {
        $prestation = $this->prestationRepository->find($id_prestation);

        if (!$prestation) {
            return ["content" => "la prestation n'existe pas en DB !!", "status_code" => 404];
        }

        try {
            $this->prestationRepository->remove($prestation, true);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, 'Une erreur est survenue lors de la suppression du client');
        }

        return ["content" => "l'intervention " . $prestation->getTitle() . " a bien été supprimé !", "status_code" => 200];
    }
}
