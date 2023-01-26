<?php

namespace App\Services;

use App\Entity\Prix;
use App\Repository\PrixRepository;
use App\Utils\Functions;

class PrixService {

    public function __construct(private PrixRepository $prixRepository, private Functions $functions)
    {

    }

    public function create_prix(Prix $prix): array
    {

        try
        {
            $this -> prixRepository -> save($prix, true);
        }
        catch(\Exception $e)
        {
            return $this -> functions -> messageErreur($e, "Erreur lors de l'enregistrement en base !");
        }

        return ["content" => $prix, "status_code" => 201];

    }

    public function update_prix(Prix $prix, int $id): array
    {

        $prixFromDb = $this ->prixRepository->find($id);

        if(empty($prixFromDb))
        {
            return ["content" => "le prix " . $prix ->getId() . " n'éxiste pas en DB !"];
        }

        $newPrix = $prixFromDb -> setIntitule($prix ->getIntitule())
                               -> setMontant($prix->getMontant());

        try
        {
            $this -> prixRepository -> save($newPrix, true);
        }
        catch(\Exception $e)
        {
            return $this -> functions -> messageErreur($e, "Erreur lors de l'enregistrement en base !");
        }

        return ["content" => "le prix a bien été modifié !", "status_code" => 200];

    }
}