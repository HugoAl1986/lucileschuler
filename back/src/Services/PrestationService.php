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

        $prestationFromDB->setDate($prestation->getDate())
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
            $prestations = $this->prestationRepository->findBy([], ["date" => "DESC"]);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, 'Erreur lors de la récupération des données');
        }

        

        return ["content" => $prestations, "status_code" => 200];
    }
}
