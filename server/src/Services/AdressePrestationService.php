<?php

namespace App\Services;

use App\Entity\AdressePrestation;
use App\Repository\AdressePrestationRepository;
use App\Repository\PrestationRepository;
use App\Utils\Functions;

class AdressePrestationService
{

    public function __construct(private Functions $functions, private AdressePrestationRepository $adressePrestationRepository, private PrestationRepository $prestationRepository)
    {
    }

    public function createAdressePrestation(AdressePrestation $adressePrestation, int $id_prestation): array
    {

        $prestation = $this->prestationRepository->find($id_prestation);
        if(empty($prestation)){
            return ["content" => "la prestation n°" . $id_prestation . " n'existe pas en DB", "status_code" => 404];
        }
        $adressePrestation ->addPrestation($prestation);
        try {
           $this->adressePrestationRepository->save($adressePrestation, true);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, "Erreur lors de la création en base de donnée !!");
        }

        return ["content" => $adressePrestation, "status_code" => 201];
    }

    public function updateAdressePrestation(AdressePrestation $adressePrestation, int $id): array
    {

        $adresseFromDB = $this->adressePrestationRepository->find($id);

        if (!$adresseFromDB) {
            return ["content" => "Aucune adresse n'a été trouvé avec cet identifiant !", "status_code" => 404];
        }

        $adresseFromDB->setNomEcurie($adressePrestation->getNomEcurie())
            ->setRue($adressePrestation->getRue())
            ->setNumeroRue($adressePrestation->getNumeroRue())
            ->setVille($adressePrestation->getVille())
            ->setCodePostal($adressePrestation->getCodePostal())
            ->setComplement($adressePrestation->getComplement());

        try {
            $this->adressePrestationRepository->save($adresseFromDB, true);
        } catch (\Exception $e) {
            return $this->functions->messageErreur($e, "Une erreur s'est produite lors de la modification de l'adresse en base de donnée !!");
        }

        return ["content" => "l'adresse a bien été modifié !", "status_code" => 200];
    }
}
