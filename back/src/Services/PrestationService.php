<?php

namespace App\Services;

use App\Entity\Prestation;
use App\Repository\ChevalRepository;
use App\Repository\PrestationRepository;
use App\Repository\PrixRepository;
use App\Utils\Functions;

class PrestationService 
{

    public function __construct(private PrestationRepository $prestationRepository, private Functions $functions, private ChevalRepository $chevalRepository, private PrixRepository $prixRepository)
    {

    }

    public function createPrestation(Prestation $prestation, $id_cheval, $id_prix){

        $cheval =$this ->chevalRepository->find($id_cheval);
        $prix = $this -> prixRepository -> find($id_prix);
        $prestation -> setCheval($cheval)
                    -> setPrix($prix);

        try
        {
            $this -> prestationRepository-> save($prestation, true);
        }
        catch(\Exception $e)
        {
            return $this -> functions -> messageErreur($e, "Erreur lors de l'enregistrement en base !");
        }

        return ["content" => $prestation, "status_code" => 201];
    }
}